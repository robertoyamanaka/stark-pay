// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Whitelist {
    mapping(address => bool) public whitelisted;
    mapping(address => uint256) public tokenBalances;

    event AddressAdded(address indexed _address);
    event AddressRemoved(address indexed _address);
    event TokensTransferred(address indexed from, address indexed to, uint256 amount);

    // Modifier to restrict access to certain functions to only whitelisted addresses
    modifier onlyWhitelisted() {
        require(whitelisted[msg.sender], "Address not whitelisted");
        _;
    }

    // Add an address to the whitelist
    function addAddress(address _address) public onlyWhitelisted {
        require(_address != address(0), "Invalid address");
        require(!whitelisted[_address], "Address already whitelisted");
        
        whitelisted[_address] = true;
        emit AddressAdded(_address);
    }

    // Remove an address from the whitelist
    function removeAddress(address _address) public onlyWhitelisted {
        require(whitelisted[_address], "Address not whitelisted");

        whitelisted[_address] = false;
        emit AddressRemoved(_address);
    }

    // Check if an address is whitelisted
    function isWhitelisted(address _address) public view returns (bool) {
        return whitelisted[_address];
    }

    // Transfer ERC20 tokens from whitelisted address to another address
    function transferTo(address _tokenAddress, address _to, uint256 _amount) public onlyWhitelisted {
        require(_to != address(0), "Invalid recipient address");
        require(whitelisted[_to], "Recipient address not whitelisted");

        IERC20 token = IERC20(_tokenAddress);
        uint256 balance = token.balanceOf(msg.sender);
        require(balance >= _amount, "Insufficient balance");

        tokenBalances[msg.sender] += _amount;
        require(token.transferFrom(msg.sender, _to, _amount), "Transfer failed");

        emit TokensTransferred(msg.sender, _to, _amount);
    }
}