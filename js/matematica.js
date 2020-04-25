function soma (numero1, numero2){
    return(numero1+numero2);
}

function canPerformTransaction() {
    if (signerAddress.length === 42) {
        return true
    }
    return false
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
