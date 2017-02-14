class Item {
    constructor(nome, valor, quantidade, imagem) {
        this._nome = nome;
        this._valor = valor;
        this._quantidade = quantidade;
        this._img = imagem;
        Object.freeze(this);
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

    get imagem() {

        return this._img;
    }
}