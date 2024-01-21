// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {IPool} from "@aave-v3-core/interfaces/IPool.sol";
import {ICreditDelegationToken} from "@aave-v3-core/interfaces/ICreditDelegationToken.sol";
import {LetsGHOWallet} from "./LetsGHOWallet.sol";

contract LetsGHOGateway {
    address public admin;
    struct RecipientData {
        uint16 lastEpoch;
        uint120 claimableAmount;
        uint120 closingAmount;
        uint120 pendingAmount;
        uint16 requestClosingOn;
        bool cleared;
    }
    mapping(address => address) ghoWallets;
    mapping(address => RecipientData) recipients;
    ERC20Permit public immutable ghoToken;
    IPool public immutable pool;
    ICreditDelegationToken public immutable debtToken;
    uint public constant epochLength = 28 days;
    uint public constant settleingLength = 7 days;
    uint32 public immutable firstEpochTime;

    constructor(
        address _admin,
        address _ghoToken,
        address _pool,
        address _debtToken,
        uint32 _firstEpochTime
    ) {
        admin = _admin;
        ghoToken = ERC20Permit(_ghoToken);
        pool = IPool(_pool);
        debtToken = ICreditDelegationToken(_debtToken);
        firstEpochTime = _firstEpochTime;
    }

    function _handleRecivedValue(address recipient, uint256 amount) internal {
        RecipientData storage recipientData = recipients[recipient];
        uint16 epoch = getEpoch();
        if (recipientData.lastEpoch < epoch) {
            recipientData.lastEpoch = epoch;
            recipientData.claimableAmount = recipientData.closingAmount;
            recipientData.closingAmount = recipientData.pendingAmount;
            recipientData.pendingAmount = 0;
        }
        recipientData.pendingAmount += uint120(amount);
    }

    function getEpoch() public view returns (uint16) {
        return uint16((block.timestamp - firstEpochTime) / epochLength) + 1;
    }

    function settleWithPermit(
        address payer,
        address recipient,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        ghoToken.permit(payer, address(this), amount, deadline, v, r, s);
        ghoToken.transferFrom(payer, address(this), amount);
        uint16 epoch = getEpoch();
        if (recipients[recipient].lastEpoch < epoch) {
            recipients[recipient].lastEpoch = epoch;
            recipients[recipient].claimableAmount = recipients[recipient]
                .pendingAmount;
            recipients[recipient].pendingAmount = 0;
        }
        recipients[recipient].pendingAmount += uint120(amount);
    }

    function dispute(
        address payer,
        address recipient,
        uint256 amount
    ) external {
        require(msg.sender == admin, "LetsGHOGateway: only admin can dispute");
        ghoToken.transferFrom(address(this), address(payer), amount);
        recipients[recipient].pendingAmount -= uint120(amount);
    }

    function settleWithDebt(
        address payer,
        address recipient,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        debtToken.delegationWithSig(
            payer,
            address(this),
            amount,
            deadline,
            v,
            r,
            s
        );
        pool.borrow(address(ghoToken), amount, 2, 0, payer);

        uint16 epoch = getEpoch();
        if (recipients[recipient].lastEpoch < epoch) {
            recipients[recipient].lastEpoch = epoch;
            recipients[recipient].claimableAmount = recipients[recipient]
                .pendingAmount;
            recipients[recipient].pendingAmount = 0;
        }
    }

    function settleFromWallet(
        address payer,
        address[] calldata recipient,
        uint256[] calldata amount
    ) external {
        LetsGHOWallet wallet = LetsGHOWallet(ghoWallets[payer]);
        require(msg.sender == admin, "LetsGHOGateway: only admin can settle");
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < recipient.length; i++) {
            _handleRecivedValue(recipient[i], amount[i]);
            totalAmount += amount[i];
        }
        wallet.pull(totalAmount);
        pool.borrow(address(ghoToken), totalAmount, 2, 0, address(wallet));
    }

    function newWallet() external {
        require(
            ghoWallets[msg.sender] == address(0),
            "LetsGHOGateway: wallet exists"
        );
        ghoWallets[msg.sender] = address(
            new LetsGHOWallet(address(this), msg.sender)
        );
    }

    function withdraw(address recipient) external {
        RecipientData storage recipientData = recipients[recipient];
        uint120 amount = recipientData.claimableAmount;
        recipientData.claimableAmount = 0;
        ghoToken.transfer(recipient, amount);
    }
}
