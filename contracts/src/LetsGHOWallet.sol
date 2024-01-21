// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {LetsGHOGateway} from "./LetsGHOGateway.sol";
import {ICreditDelegationToken} from "@aave-v3-core/interfaces/ICreditDelegationToken.sol";
import {IPool} from "@aave-v3-core/interfaces/IPool.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LetsGHOWallet {
    address public owner;
    LetsGHOGateway public gateway;
    bool public isLocked;
    uint public unlockEpoch;

    constructor(address _gateway, address _owner) {
        gateway = LetsGHOGateway(_gateway);
        owner = _owner;
        isLocked = true;
    }

    function requestUnlock() external {
        require(msg.sender == owner, "LetsGHOWallet: not owner");
        require(isLocked == true, "LetsGHOWallet: locked");
        unlockEpoch = gateway.getEpoch() + 1;
    }

    function adminClose() external {
        require(msg.sender == address(gateway), "LetsGHOWallet: not gateway");
        isLocked = false;
    }

    function repay(uint amount) external {
        IPool pool = gateway.pool();
        IERC20(address(gateway.ghoToken())).approve(address(pool), amount);
        pool.repay(address(gateway.ghoToken()), amount, 2, address(this));
    }

    function unlock() external {
        require(msg.sender == owner, "LetsGHOWallet: not owner");
        require(isLocked == true, "LetsGHOWallet: locked");
        require(
            unlockEpoch <= gateway.getEpoch(),
            "LetsGHOWallet: not unlocked"
        );
        isLocked = false;
        gateway.exit(owner);
    }

    function pull(uint amount) external {
        require(msg.sender == address(gateway), "LetsGHOWallet: not gateway");
        ICreditDelegationToken(gateway.debtToken()).approveDelegation(
            address(gateway),
            amount
        );
    }

    function deposit(address asset, uint amount) external {
        IERC20(asset).transferFrom(msg.sender, address(this), amount);
        IPool pool = gateway.pool();
        IERC20(asset).approve(address(pool), amount);
        pool.supply(asset, amount, address(this), 0);
    }

    // wallet become normal AA after unlock
    function execute(
        address to,
        uint256 value,
        bytes memory data,
        bool delegateCall,
        uint256 txGas
    ) internal returns (bool success) {
        require(isLocked == false, "LetsGHOWallet: locked");
        require(msg.sender == owner, "LetsGHOWallet: not owner");
        if (delegateCall) {
            /* solhint-disable no-inline-assembly */
            /// @solidity memory-safe-assembly
            assembly {
                success := delegatecall(
                    txGas,
                    to,
                    add(data, 0x20),
                    mload(data),
                    0,
                    0
                )
            }
            /* solhint-enable no-inline-assembly */
        } else {
            /* solhint-disable no-inline-assembly */
            /// @solidity memory-safe-assembly
            assembly {
                success := call(
                    txGas,
                    to,
                    value,
                    add(data, 0x20),
                    mload(data),
                    0,
                    0
                )
            }
            /* solhint-enable no-inline-assembly */
        }
    }
}
