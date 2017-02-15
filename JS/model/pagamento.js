class Pagamento {
    constructor(cartao, cliente, pedido) {
        this._cartao = cartao;
        this._cliente = cliente;
        this._pedido = pedido;
    }


    imprimirPagamento() {
        console.info("Pagamento Feito com sucesso");

    }

    fazerPagamentoMoip() {
        let validadeMes = this._cartao.validadeMes;
        let cartaoNumero = this._cartao.numero;

        let order = window.localStorage.getItem("id_tr");
        console.log("https://sandbox.moip.com.br/v2/orders/" + order + "/payments");
        $.ajax({
            url: "https://sandbox.moip.com.br/v2/orders/" + order + "/payments",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic MDEwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMDE6QUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQg==");
            },
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            data: '{"installmentCount":2,"fundingInstrument":{"method":"CREDIT_CARD","creditCard":{"expirationMonth":12,"expirationYear": 25,' +
                '"number":' + cartaoNumero + ',"cvc": "123",' +
                '"holder":{"fullname":"João Portador da Silva","birthdate":"1988-12-30","taxDocument":{"type":"CPF","number":"12345679891"},"phone":{"countryCode":"55","areaCode":"11","number":"66778899"}}}}}',
            success: function(data) {
                var resposta = data;
                console.info("Pagamento completo");
                window.location.replace("/src/finalizado.html");
            },
            error: function() {
                console.error("Não foi possivel fazer essa requisição");
            }
        });

    }
}