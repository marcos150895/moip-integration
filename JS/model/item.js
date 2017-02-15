class Item {
    constructor(nome, valor, quantidade) {
        this._nome = nome;
        this._valor = valor;
        this._quantidade = quantidade;

    }

    get nome() {

        return this._nome;
    }

    get valor() {

        return this._valor;
    }

    get quantidade() {

        return this._quantidade;
    }

}