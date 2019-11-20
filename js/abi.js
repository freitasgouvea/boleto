var abiContrato = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "hashBoleto",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_payerID",
                "type": "string"
            }
        ],
        "name": "pagarBoleto",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "listaDeBoletos",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "ownerID",
                "type": "string"
            },
            {
                "internalType": "address payable",
                "name": "payer",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "payerID",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "valorDoBoleto",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "vencimento",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "multaPorAtraso",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "jurosDeMora",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "dataDoPagamento",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "valorPago",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "ativo",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "pagamento",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "hashBoleto",
                "type": "bytes32"
            }
        ],
        "name": "verBoleto",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_ownerID",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_valorDoBoleto",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_vencimento",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_multaPorAtraso",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_jurosDeMoraPorDia",
                "type": "uint256"
            }
        ],
        "name": "criarBoleto",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "hashBoleto",
                "type": "bytes32"
            }
        ],
        "name": "detalhesBoleto",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "hashBoleto",
                "type": "bytes32"
            }
        ],
        "name": "cancelarBoleto",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_banco",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "hashBoleto",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "valorDoBoleto",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "vencimento",
                "type": "uint256"
            }
        ],
        "name": "BoletoCriado",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "hashBoleto",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "valorPago",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "dataDoPagaemnto",
                "type": "uint256"
            }
        ],
        "name": "BoletoPago",
        "type": "event"
    }
]