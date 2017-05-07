import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { HomePage } from '../home/home';
import { Agendamento} from '../../domain/agendamento/agendamento';

// importando HTTP
import { Http } from '@angular/http';

@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public agendamento: Agendamento;

  private _alerta: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _http: Http,
    private _alertCtrl: AlertController) {

    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');

    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this._alerta = this._alertCtrl.create({
      title: 'Aviso', 
      buttons: [{ text: 'Ok', handler: () => this.navCtrl.setRoot(HomePage) }]
    });
  }

  // Este evento só é disparado uma vez e jogado no cache
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  agenda() {

    if(!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email) {
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deverá preencher todas as informações',
        buttons: [{ text: 'Ok'}]
      }).present();
      return;
    }

    let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${this.agendamento.carro.nome}&preco=${this.agendamento.valor}&nome=${this.agendamento.nome}&endereco=${this.agendamento.endereco}&email=${this.agendamento.email}&data=${this.agendamento.data}`;
    this._http
      .get(api)
      .toPromise()
      .then(() => {
        this._alerta.setSubTitle('Agendamento realizado com sucesso');
        this._alerta.present();
      })
      .catch(err => {
        this._alerta.setSubTitle('Não foi possível realizar o agendamento. Tente mais tarde!');
        this._alerta.present();
    });

  }

}
