class CarrinhoController {
    constructor() {
        console.log("crie um nova carrinho");
        let $ = document.querySelector.bind(document);
        this._inputNome = $("#nome");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._pedido = new Pedido();
    }
    adiciona(event) {

        event.preventDefault();
        this._pedido._items = this._recuperarStorage("carrinho");
        this._pedido.adicionar(this._criaItem());
        this._inserirStorage("carrinho", this._pedido._items);
        window.location.replace("/src/cart.html");


    }

    _criaItem() {

        return new Item(
            this._inputNome.textContent,
            this._inputValor.value,
            this._inputQuantidade.value);
    }

    _inserirStorage(chave, valor) {
        let _valor = JSON.stringify(valor);
        window.localStorage.setItem(chave, _valor);
    }

    _recuperarStorage(chave) {
        //console.log("recuperando " + window.localStorage.getItem(chave));
        let objeto = JSON.parse(window.localStorage.getItem(chave));
        if (objeto == null || objeto == undefined) {
            return this._pedido._items;
        }
        return objeto;
    }

    popularCarrinho() {

        let table = document.querySelector("table tbody");
        let carrinho = this._recuperarStorage("carrinho");
        let total = 0;
        carrinho.forEach(function(item) {
            var tr = document.createElement('tr');
            var td_nome = document.createElement('td');
            var td_valor = document.createElement('td');
            var td_quantidade = document.createElement('td');
            var td_total = document.createElement('td');
            var soma = item._valor * item._quantidade;
            td_nome.textContent = item._nome;
            td_valor.textContent = item._valor;
            td_quantidade.textContent = item._quantidade;
            td_total.textContent = soma;
            tr.appendChild(td_nome);
            tr.appendChild(td_valor);
            tr.appendChild(td_quantidade);
            tr.appendChild(td_total);
            table.appendChild(tr);
            total += soma;
        });
        let inputTotal = document.querySelector("#total");
        inputTotal.value = total;

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
    abrirPedido() {
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
                var resposta = JSON.stringify(data);
                console.info("Pedido Criado com Sucesso na moip");
                //console.log(resposta);
            },
            error: function() {
                console.error("Não foi possivel fazer essa requisição");
            }
        });
    }

}