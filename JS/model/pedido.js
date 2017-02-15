class Pedido {
    constructor() {
        this._cliente = "";
        this._items = [];
    }

    adicionar(item) {

        this._items.push(item);
    }

    get pedido() {

        return [].concat(this._items);
    }

    setCliente(cliente) {
        this._cliente = cliente;
    }

    _recuperarStorage(chave) {
        //console.log("recuperando " + window.localStorage.getItem(chave));
        let objeto = JSON.parse(window.localStorage.getItem(chave));
        if (objeto == null || objeto == undefined) {
            return this._pedido._items;
        }
        return objeto;
    }

    obterItemsMoip(cupom) {
        var desconto = 0;
        if (cupom == true) {
            desconto = 5;
        }

        // não pode colocar um preço tip real como 3.4
        let pedido = this._recuperarStorage("carrinho");
        let pedidos = [];
        pedido.forEach(function(item) {
            let preco = item._valor * (1 - (desconto / 100));
            console.log(preco);
            var pedido = {
                "product": item._nome,
                "quantity": item._quantidade,
                "detail": "  ",
                "price": Math.round(preco)
            };
            pedidos.push(pedido);
        });
        return JSON.stringify(pedidos);
    }
    abrirPedidoMoip() {
        let cupom = document.querySelector("#cupom");
        let pedido = "";
        if (cupom.value == "") {
            pedido = this.obterItemsMoip(false);
        } else {
            pedido = this.obterItemsMoip(true);
        }
        console.info("Abrindo pedido no moip");
        $.ajax({
            url: "https://sandbox.moip.com.br/v2/orders",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic MDEwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMDE6QUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQg==");
            },
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            data: '{ "ownId": "ludjinha_marcos",  "items": ' + pedido +
                ', "customer": {"ownId": "Mingau_doce","fullname": "t-rex", "email": "joaosilva@email.com"}}',
            success: function(data) {
                var resposta = data;
                console.info("Pedido Criado com Sucesso na moip");
                window.localStorage.setItem("id_tr", resposta.id);
                window.location.replace("/src/checkout.html");

            },
            error: function() {
                console.error("Não foi possivel fazer essa requisição");
            }
        });
    }
}