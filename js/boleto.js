var status;

var contractAddress = "0x891710b3475b3076Dd1F9C6a6A9b1f87BA5e0517"; //add
var provider = ethers.getDefaultProvider('rinkeby'); //main
var contract = new ethers.Contract(contractAddress, abiContrato, provider);

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