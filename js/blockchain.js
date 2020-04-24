var status;

var contractAddress = "0xE1E8035ae15EcD8D5b4593CAF22Eff90d95A209D"; //add
var provider = ethers.getDefaultProvider('rinkeby'); //main
var contract = new ethers.Contract(contractAddress, abiContrato, provider);


function canPerformTransaction() {
    if (signerAddress.length === 42) {
        return true
    }
    return false
}

async function loadBasicSC(_factoryContractAddress) {
    try {
        contractAddress = _factoryContractAddress;
        // Use Infura's provider
        provider = new ethers.providers.InfuraProvider('homestead');
        network = await provider.getNetwork();
        await loadBoletoSC();   
        $("#btnBuscarCertificado").prop('disabled', false);       
    } catch (err) {
        this.console.error("Could not connect to Metamask. Error: ", err.message)
        alert("Please check your Metamask or give the appropriate permissions")
    }
}

async function loadWallet() {
    try {
        signer = provider.getSigner();
        signerAddress = await signer.getAddress();
        this.console.log('loadWallet', "User address", signerAddress, signerAddress.length);            
    } catch (e) {
        console.error("loadWallet", e.message);
        throw e;
    }
}

async function loadBoletoSC() {
    try {
        contract = new ethers.Contract(contractAddress, contractABI, provider);
        console.log('loadBoletoSC contract', contract);
    } catch (e) {
        console.error("loadBoletoSC", e.message);
        throw e;
    }
}

async function obtemBoletoHash() {
    let frm = document.boletoForm
    try {
        if (contract) {
            console.log('obtemBoletoHash', 'iniciando busca', frm.boleto.value)
            let detalhes = await contract.verBoleto(frm.boleto.value)
            document.getElementById("viewBoleto").style.display = "block"
            $("#viewBoleto").html(detalhes);
            document.getElementById("boletoForm").style.display = "none"
        }
    } catch (err) {
        console.error('obtemBoletooHash', err)
        alert("Não foi possível encontrar este boleto, tente novamente.")
    }
}