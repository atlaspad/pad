// SPDX-License-Identifier: MIT
/*
2024 © Atlaspad Launchpad
Virjilakrum
Compatible with OpenZeppelin Contracts ^5.0.0
*/

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract APToken is ERC20, ERC20Burnable, Ownable {
    uint private constant _numTokens = 500000000;

    // event NameChanged(string newName, address by);

    constructor(
        address initialOwner
    ) ERC20("APToken", "AP") Ownable(initialOwner) {
        _mint(msg.sender, _numTokens * (10 ** decimals()));
    }

    // function changeName(string memory name) public onlyOwner{
    //     _name = name;
    //     emit NameChanged(name, msg.sender);
    // }

    // function name() public view returns (string memory) {
    //     return _name;
    // }
}
