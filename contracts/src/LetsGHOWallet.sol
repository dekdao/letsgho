// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract LetsGHOWallet {
    address public owner;
    address public gateway;
    bool isLocked;
    uint withdrawEpoch;

    constructor(address _gateway, address _owner) {
        gateway = _gateway;
        owner = _owner;
    }

    function requestWithdrawal() external {}

    function withdraw() external {}

    function settle() external {}

    function deposit() external {}

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
