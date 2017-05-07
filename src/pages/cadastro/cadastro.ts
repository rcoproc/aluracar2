import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';

@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string;
  public endereco: string;
  public email: string;
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');
  }

  // Este evento só é disparado uma vez e jogado no cache
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  agenda() {
    console.log(this.nome);
    console.log(this.data);
  }

}
