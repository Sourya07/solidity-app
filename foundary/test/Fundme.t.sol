pragma solidity ^0.8.30;

import {Test} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";

contract ContractBTest is Test {
    uint256 testNumber;

    FundMe fundme;

    function setUp() public {
        // Mock price feed or pass some dummy address for now
        fundme = new FundMe(address(0x123));
    }

    function test_Numbercontractaddress() public {
        assertEq(fundme.getOwner(), address(this));
    }

    /// forge-config: default.allow_internal_expect_revert = true
    function testRevert_Subtract43() public {
        vm.expectRevert();
        testNumber -= 43;
    }
}
