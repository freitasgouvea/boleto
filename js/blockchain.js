var contract;
var provider;
var contractAddress;

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
   