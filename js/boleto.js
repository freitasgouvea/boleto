var status;

var enderecoContrato = "0x891710b3475b3076Dd1F9C6a6A9b1f87BA5e0517"; //add
var provedor = ethers.getDefaultProvider('rinkeby'); //main
var contrato = new ethers.Contract(enderecoContrato, abiContrato, provedor);

var viewBoleto = document.getElementById("returnBoleto");
var viewDetalhes = document.getElementById("returnDetalhes");

// => arrow function: (resultado) => { declaração }

contrato.verBoleto()
    .then((resultado) => {
        viewBoleto.innerHTML = resultado;
    })
    .catch((err) => {
        console.error(err);
        viewBoleto.innerHTML = err;
    });                     
}();

// funcao().
//    .then(funçao a ser chamada em caso de sucesso () => {} )
//    .catch(funcao a ser chamada em caso de erro () => {})