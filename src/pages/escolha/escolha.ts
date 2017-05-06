import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
    templateUrl: 'escolha.html'
})

export class EscolhaPage {

    public carro;
    public acessorios;

    constructor(public navParams: NavParams) {
        this.carro = this.navParams.get('carroSelecionado');
        this.acessorios = [
            { nome: 'Freio ABS', preco: 800 },
            { nome: 'Ar-condicionado', preco: 1000 },
            { nome: 'MP3 Player', preco: 500 }
        ];
    }

}