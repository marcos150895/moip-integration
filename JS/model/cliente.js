class Cliente {
    constructor(nome, email, telefone, endereco, cidade, cep) {
        this._nome = nome;
        this._email = email;
        this._telefone = telefone;
        this._endereco = endereco;
        this._cidade = cidade;
        this._CEP = cep
        Object.freeze(this);
    }

    get nome() {
        return this._nome;
    }

    get email() {
        return this._email;
    }

    get telefone() {
        return this._telefone;
    }

    get endereco() {

        return this._endereco;
    }

    get cidade() {

        return this._cidade;
    }

    get CEP() {

        return this._CEP;

    }
}