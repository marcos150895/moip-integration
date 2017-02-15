class Cartao {

    constructor(numero, nome, validadeMes, validadeAno) {
        this._numero = numero;
        this._nome = nome;
        this._validadeMes = validadeMes;
        this._validadeAno = validadeAno;
    }

    get numero() {

        return this._numero;
    }

    get nome() {

        return this._nome;
    }

    get validadeMes() {

        return this._validadeMes;
    }

    get validadeAno() {
        return this._validadeAno;
    }
}