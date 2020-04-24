pragma solidity 0.6.6;

contract Boletos {

    address banco;
    mapping(bytes32 => Boleto) private listaDeBoletos;
    
    struct Boleto {
        bytes32 hash;
        uint256 dataDaCriacao;
        address payable owner;
        string ownerID;
        address payable payer;
        string payerID;
        uint256 valorDoBoleto;
        uint256 vencimento;
        uint256 multaPorAtraso;
        uint256 jurosDeMora;
        uint256 dataLimite;
        uint256 dataDoPagamento;
        uint256 valorPago;
        bool ativo;
        bool pagamento;
    }

    event BoletoCriado(bytes32 indexed hashBoleto, address indexed owner, uint256 valorDoBoleto, uint256 vencimento);
    event BoletoPago(bytes32 indexed hashBoleto, address indexed owner, address indexed payer, uint256 valorPago, uint256 dataDoPagaemnto);
    
    constructor (
        address _banco
        ) public
    {
      banco = _banco;
    }
    
    function criarBoleto(
        string memory _ownerID,
        uint256 _valorDoBoleto,
        uint256 _vencimento,
        uint256 _dataLimite,
        uint256 _multaPorAtraso,
        uint256 _jurosDeMoraPorDia
        )
        public
        returns (bytes32)
    {
        bytes32 hashBoleto = keccak256(abi.encodePacked(msg.sender, now));
        Boleto memory bn = Boleto(hashBoleto, now, msg.sender, _ownerID, 0x0000000000000000000000000000000000000000, 'identidade do pagador', _valorDoBoleto, _vencimento, _multaPorAtraso, _jurosDeMoraPorDia, _dataLimite, 0, 0, true, false);
        listaDeBoletos[hashBoleto] = bn;
        emit BoletoCriado (hashBoleto, bn.owner, bn.valorDoBoleto, bn.vencimento);
        return hashBoleto;
    }
    
    function cancelarBoleto (bytes32 hashBoleto) public returns(bool) {
        Boleto storage bc = listaDeBoletos[hashBoleto];
        require(msg.sender == listaDeBoletos[hashBoleto].owner || msg.sender == banco, "Somente o Emissor ou Banco pode cancelar um boleto.");
        require(listaDeBoletos[hashBoleto].ativo == true, "Boleto Inativo");
        require(listaDeBoletos[hashBoleto].pagamento == false, "Este boleto já foi pago.");
        bc.ativo = false;
        return (true);
    }
    
    function verBoleto (bytes32 hashBoleto) public view returns(uint256, uint256, uint256, uint256, uint256, uint256) {
        if (now<listaDeBoletos[hashBoleto].vencimento) {
            uint256 valorAtualizado;  
            valorAtualizado= listaDeBoletos[hashBoleto].valorDoBoleto;
            return (listaDeBoletos[hashBoleto].valorDoBoleto, listaDeBoletos[hashBoleto].multaPorAtraso, listaDeBoletos[hashBoleto].jurosDeMora, listaDeBoletos[hashBoleto].vencimento, listaDeBoletos[hashBoleto].dataLimite, valorAtualizado);
        }
        else {
            uint256 valorAtualizado; 
            valorAtualizado= listaDeBoletos[hashBoleto].valorDoBoleto+((now-listaDeBoletos[hashBoleto].vencimento)/86400)*listaDeBoletos[hashBoleto].jurosDeMora+listaDeBoletos[hashBoleto].multaPorAtraso;
            return (listaDeBoletos[hashBoleto].valorDoBoleto, listaDeBoletos[hashBoleto].multaPorAtraso, listaDeBoletos[hashBoleto].jurosDeMora, listaDeBoletos[hashBoleto].vencimento, listaDeBoletos[hashBoleto].dataLimite, valorAtualizado);
        }
    }
    
    function detalhesBoleto (bytes32 hashBoleto) public view returns(bytes32, uint256, bool, bool, address, string memory){
        return (listaDeBoletos[hashBoleto].hash, listaDeBoletos[hashBoleto].dataDaCriacao, listaDeBoletos[hashBoleto].ativo, listaDeBoletos[hashBoleto].pagamento, listaDeBoletos[hashBoleto].owner, listaDeBoletos[hashBoleto].ownerID);   
    }
    
    function reciboBoleto (bytes32 hashBoleto) public view returns(address, string memory, address, string memory, uint256, uint256){
        return (listaDeBoletos[hashBoleto].owner, listaDeBoletos[hashBoleto].ownerID, listaDeBoletos[hashBoleto].payer, listaDeBoletos[hashBoleto].payerID, listaDeBoletos[hashBoleto].dataDoPagamento, listaDeBoletos[hashBoleto].valorPago);   
    }
    
        
    function pagarBoleto (bytes32 hashBoleto, string memory _payerID) public payable returns(bool) {
        require (listaDeBoletos[hashBoleto].ativo == true, "Boleto Inativo");
        require (now<listaDeBoletos[hashBoleto].dataLimite, "Boleto Expirado");
        require(listaDeBoletos[hashBoleto].pagamento == false, "Este boleto já foi pago.");
        if (now<listaDeBoletos[hashBoleto].vencimento) {
            uint256 valorAtualizado;  
            valorAtualizado= listaDeBoletos[hashBoleto].valorDoBoleto;
            require (msg.value == valorAtualizado, "Valor incorreto");
            listaDeBoletos[hashBoleto].owner.transfer(msg.value);
            listaDeBoletos[hashBoleto].payer = msg.sender;
            listaDeBoletos[hashBoleto].payerID = _payerID;
            listaDeBoletos[hashBoleto].dataDoPagamento = now;
            listaDeBoletos[hashBoleto].valorPago = msg.value;
            listaDeBoletos[hashBoleto].pagamento = true;
            emit BoletoPago (hashBoleto, listaDeBoletos[hashBoleto].owner, listaDeBoletos[hashBoleto].payer, listaDeBoletos[hashBoleto].valorPago, listaDeBoletos[hashBoleto].dataDoPagamento);
        }
        else {
            uint256 valorAtualizado; 
            valorAtualizado= listaDeBoletos[hashBoleto].valorDoBoleto+((now-listaDeBoletos[hashBoleto].vencimento)/86400)*listaDeBoletos[hashBoleto].jurosDeMora+listaDeBoletos[hashBoleto].multaPorAtraso;
            require (msg.value == valorAtualizado, "Valor incorreto");
            listaDeBoletos[hashBoleto].owner.transfer(msg.value);
            listaDeBoletos[hashBoleto].payer = msg.sender;
            listaDeBoletos[hashBoleto].payerID = _payerID;
            listaDeBoletos[hashBoleto].dataDoPagamento = now;
            listaDeBoletos[hashBoleto].valorPago = msg.value;
            listaDeBoletos[hashBoleto].pagamento = true;
            emit BoletoPago (hashBoleto, listaDeBoletos[hashBoleto].owner, listaDeBoletos[hashBoleto].payer, listaDeBoletos[hashBoleto].valorPago, listaDeBoletos[hashBoleto].dataDoPagamento);
        }
    }
    
}
