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
	let frmSearch = document.boletoForm
	try {
		if (contractRead) {
			let details = await contractRead.detalhesBoleto(frmSearch.boleto.value)
			let view = await contractRead.verBoleto(frmSearch.boleto.value)
			console.log(details, view)
			document.getElementById("searchBoleto").style.display = "none"
			document.getElementById("viewBoleto").style.display = "block"
			document.getElementById("codigoBoleto").innerHTML = details[0];
			document.getElementById("dataDaCraiacaoBoleto").innerHTML = timestampToDate(details[1]);
			document.getElementById("ownerBoleto").innerHTML = details[4];
			document.getElementById("ownerIdBoleto").innerHTML = details[5];
			document.getElementById("valorDoBoleto").innerHTML = view[0] / 1000000000000000000;
			document.getElementById("multaPorAtrasoBoleto").innerHTML = view[1] / 1000000000000000000;
			document.getElementById("jurosDeMoraBoleto").innerHTML = view[2];
			document.getElementById("vencimentoBoleto").innerHTML = timestampToDate(view[3]);
			document.getElementById("dataLimiteBoleto").innerHTML = timestampToDate(view[4]);
			document.getElementById("linkBoleto").innerHTML = "https://boleto.com.br/" + details[0];
			document.getElementById("hashBoleto").value = details[0];
			document.getElementById("valorAtualizadoBoleto").value = view[5];
			if (details[2] === false && details[3] === false) {
				let recipe = await contractRead.reciboBoleto(frmSearch.boleto.value)
				console.log(recipe)
				document.getElementById("inactiveBoleto").style.display = "inline"
			}
			else if (details[2] === true && details[3] === true) {
				let recipe = await contractRead.reciboBoleto(frmSearch.boleto.value)
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

ethereum.enable('accountsChanged', handleAccountsChanged)

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
	let frm = document.boletoPayForm
	let hash = frm.hashBoleto.value
	let amount = frm.valorAtualizadoBoleto.value
	let sender = "Não Identificado"     
    var boxCommStatus = document.getElementById("boxCommStatus");
    boxCommStatus.innerHTML = "Sending transaction...";
    contractSign.pay(hash, sender, amount)
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