let contractAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_banco",
				"type": "address"
			}
		],
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
	},
	{
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
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
				"name": "_dataLimite",
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
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
		"stateMutability": "payable",
		"type": "function"
	},
	{
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
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
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
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hashBoleto",
				"type": "bytes32"
			}
		],
		"name": "reciboBoleto",
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let contractAddress = "0xAbaC6e1dDcE1c2B4dafBD6E6a1Adb3096Fe2Cb61";

let currentAccount;

let providerRead = new ethers.providers.InfuraProvider('rinkeby', 'd7af4ca348a2460aadd341988fee82fd');
let contractRead = new ethers.Contract(contractAddress, contractAbi, providerRead);

let providerSign = new ethers.providers.Web3Provider(web3.currentProvider);
let signer = providerSign.getSigner();
let contractSign = new ethers.Contract(contractAddress, contractAbi, signer);

console.log(providerSign, signer, contractSign);

function timestampToDate(unixtime) {

	var u = new Date(unixtime * 1000);

	return ('0' + u.getUTCDate()).slice(-2) +
		'/' + ('0' + u.getUTCMonth()).slice(-2) +
		'/' + u.getUTCFullYear() +
		' - ' + ('0' + u.getUTCHours()).slice(-2) +
		':' + ('0' + u.getUTCMinutes()).slice(-2) +
		':' + ('0' + u.getUTCSeconds()).slice(-2)
}

async function obtemBoletoHash() {
	let frm = document.boletoForm
	try {
		if (contractRead) {
			let details = await contractRead.detalhesBoleto(frm.boleto.value)
			let view = await contractRead.verBoleto(frm.boleto.value)
			console.log(details, view)
			document.getElementById("searchBoleto").style.display = "none"
			document.getElementById("viewBoleto").style.display = "block"
			document.getElementById("hashBoleto").innerHTML = details[0];
			document.getElementById("dataDaCraiacaoBoleto").innerHTML = timestampToDate(details[1]);
			document.getElementById("ownerBoleto").innerHTML = details[4];
			document.getElementById("ownerIdBoleto").innerHTML = details[5];
			document.getElementById("valorDoBoleto").innerHTML = view[0] / 1000000000000000000;
			document.getElementById("multaPorAtrasoBoleto").innerHTML = view[1] / 1000000000000000000;
			document.getElementById("jurosDeMoraBoleto").innerHTML = view[2];
			document.getElementById("vencimentoBoleto").innerHTML = timestampToDate(view[3]);
			document.getElementById("valorAtualizadoBoleto").innerHTML = view[5] / 1000000000000000000;
			document.getElementById("dataLimiteBoleto").innerHTML = timestampToDate(view[4]);
			document.getElementById("linkBoleto").innerHTML = "https://boleto.com.br/" + details[0];
			if (details[2] === false && details[3] === false) {
				let recipe = await contractRead.reciboBoleto(frm.boleto.value)
				console.log(recipe)
				document.getElementById("inactiveBoleto").style.display = "inline"
			}
			else if (details[2] === true && details[3] === true) {
				let recipe = await contractRead.reciboBoleto(frm.boleto.value)
				console.log(recipe)
				document.getElementById("payedBoleto").style.display = "inline"
				document.getElementById("botaoRecibo").style.display = "inline"
				document.getElementById("ownerBoletoRecibo").innerHTML = recipe[0];
				document.getElementById("ownerIdBoletoRecibo").innerHTML = recipe[1];
				document.getElementById("payerBoleto").innerHTML = recipe[2];
				document.getElementById("payerIdBoleto").innerHTML = recipe[3];
				document.getElementById("dataDoPagamentoBoleto").innerHTML = timestampToDate(recipe[4]);
				document.getElementById("valorPagoBoleto").innerHTML = recipe[5] / 1000000000000000000;
			}
			else {
				document.getElementById("activeBoleto").style.display = "inline"
				document.getElementById("unpayedBoleto").style.display = "inline"
				document.getElementById("payerBoletoDiv").style.display = "none"
				document.getElementById("dataDoPagamentoBoletoDiv").style.display = "none"
				document.getElementById("valorPagoBoletoDiv").style.display = "none"
				document.getElementById("botaoPay").style.display = "inline"
				document.getElementById("botaoPrint").style.display = "inline"
			}
		}
	} catch (err) {
		console.error('obtemBoletoHash', err)
		alert("Não foi possível encontrar o boleto, tente novamente.")
	}
}

if (!ethereum || !ethereum.isMetaMask) {
    alert('Please install MetaMask.');
}

function loading() {
    ethereum.send('eth_accounts')
    .then(handleAccountsChanged)
    .catch(err => {
        if (err.code === 4100) { 
            console.log('Please connect to MetaMask.')
        } else {
            console.error(err)
        }
    }) 
}

ethereum.on('accountsChanged', handleAccountsChanged)

function handleAccountsChanged (accounts) {
    console.log('handleAccountsChanged', accounts.length);
    providerSign = new ethers.providers.Web3Provider(web3.currentProvider);
    signer = providerSign.getSigner();
    contractSign = new ethers.Contract(contractAddress, contractAbi, signer);
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.')        
    } else if (accounts[0] !== currentAccount) {  
        currentAccount = accounts[0];        
        if (currentAccount) {            
            console.log('handleAccountsChanged objects', accounts, currentAccount, signer);
        }
    }
}

function connectToWeb3() {  
    console.log('connectToWeb3 called');
    ethereum.send('eth_requestAccounts')
    .then(handleAccountsChanged)
    .catch(err => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.')
      } else {
        console.error(err)
      }
    })    
}


function executePayment() {
	let hash = document.hashBoleto.value
	let amount = document.valorAtualizadoBoleto.value*1000000000000000000
	let sender = "Não Identificado"     
    var boxCommStatus = document.getElementById("boxCommStatus");
    boxCommStatus.innerHTML = "Sending transaction...";
    var additionalSettings = {
        value: ethers.utils.parseUnits(amount, 'wei')
    }; 
    contractSign.pay(hash, sender, additionalSettings)
    .then( (tx) => {
        console.log("executePayment - Transaction ", tx);   
        boxCommStatus.innerHTML = "Transaction sent. Waiting for the result...";
        tx.wait()
        .then( (resultFromContract) => {
            console.log("executePayment - the result was ", resultFromContract);
            boxCommStatus.innerHTML = "Transaction executed.";
        })        
        .catch( (err) => {
            console.error("executePayment - after tx being mint");
            console.error(err);
            boxCommStatus.innerHTML = "Algo saiu errado: " + err.message;
        })
    })
    .catch( (err) => {
        console.error("executePayment - tx has been sent");
        console.error(err);
        boxCommStatus.innerHTML = "Something went wrong: " + err.message;
    })
}