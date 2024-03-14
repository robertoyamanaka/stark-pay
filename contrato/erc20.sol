// SPDX-License-Identifier: MIT
// WTF Solidity by 0xAA

pragma solidity ^0.8.4;

interface IERC20 {
    /**
     * @dev Se emite cuando `value` tokens se transfieren de una cuenta (`from`) a otra (`to`).
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Se emite cuando una cuenta (`owner`) autoriza a otra cuenta (`spender`) a usar `value` tokens en su nombre.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Devuelve la cantidad total de tokens en existencia.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Devuelve la cantidad de tokens que posee una cuenta específica (`account`).
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Transfiere `amount` tokens desde la cuenta del ejecutor de la función a la cuenta `to`.
     *
     * Devuelve `true` si la operación fue exitosa.
     *
     * Emite el evento {Transfer}.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Devuelve el monto restante que la cuenta `spender` todavía está autorizada a retirar de la cuenta `owner`.
     *
     * Este valor cambia cuando se ejecuta {approve} o {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Establece `amount` como la cantidad de tokens que `spender` puede retirar de la cuenta del ejecutor.
     *
     * Devuelve `true` si la operación fue exitosa.
     *
     * Emite el evento {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Transfiere `amount` tokens desde la cuenta `from` a la cuenta `to` utilizando el mecanismo de autorización.
     *
     * Devuelve `true` si la operación fue exitosa.
     *
     * Emite el evento {Transfer}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract ERC20 is IERC20 {

    mapping(address => uint256) public override balanceOf;

    mapping(address => mapping(address => uint256)) public override allowance;

    uint256 public override totalSupply;   // Total de tokens en existencia

    string public name;   // Nombre del token
    string public symbol;  // Símbolo del token
    
    uint8 public decimals = 18; // Decimales del token
    address public owner;

    // @dev Se ejecuta en la implementación del contrato para establecer su nombre y símbolo
    constructor(string memory name_, string memory symbol_){
        name = name_;
        symbol = symbol_;
        owner = msg.sender;
    }

    // @dev Implementación de la función `transfer`, lógica de transferencia de tokens
    function transfer(address recipient, uint amount) external override returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    // @dev Implementación de la función `approve`, lógica de autorización de tokens
    function approve(address spender, uint amount) external override returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // @dev Implementación de la función `transferFrom`, lógica de transferencia de tokens con autorización
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external override returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    // @dev Función para crear nuevos tokens, transfiriendo del `0` dirección al ejecutor de la función
    function mint(uint amount) external {
        require(owner == msg.sender);
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    // @dev Función para destruir tokens, transfiriendo del ejecutor de la función a la dirección `0`
    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }

}
