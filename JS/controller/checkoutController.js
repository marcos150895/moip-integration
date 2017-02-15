class CheckoutController {

    constructor() {

        console.log("criei um novo checkout");
        let $ = document.querySelector.bind(document);
        //questao a cliente
        this._inputNome = $("#nome");
        this._inputEmail = $("#email");
        this._inputTelefone = $("#telefone");
        this._inputEndereco = $("#endereco");
        this._inputCidade = $("#cidade");
        this._inputCEP = $("#cep");

        //questao ao pagamento
        this._inputNumCartao = $("#numero");
        this._inputNomeCartao = $("#nome_cartao");
        this._inputValidadeAno = $("#validade_ano");
        this._inputValidadeMes = $("#validade_mes");


    }

    adicionar(event) {
        console.log("numero cartao" + this._inputNumCartao.value);
        //event.preventDefault();
        this._cliente = new Cliente(this._inputNome.value, this._inputEmail.value, this._inputTelefone.value,
            this._inputEndereco.value, this._inputCidade.value, this._inputCEP.value);
        this._cartao = new Cartao(this._inputNumCartao.value, this._inputNomeCartao, this._inputValidadeMes.selected,
            this._inputValidadeAno.selected);
        this._pedido = new Pedido();
        this._pedido._items = JSON.parse(window.localStorage.getItem("carrinho"));
        this._pedido._cliente = this._cliente;

        let pagamento = new Pagamento(this._cartao, this._cliente, this._pedido);
        pagamento.imprimirPagamento();
        pagamento.fazerPagamentoMoip();
    }
}