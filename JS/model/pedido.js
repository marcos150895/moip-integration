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
}