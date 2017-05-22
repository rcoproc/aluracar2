import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { HomePage } from '../home/home';
import { Agendamento} from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';
// import { Vibration, DatePicker } from 'ionic-native';

// IMPORTOU OS NOVOS PLUGINS E UM NOVO NAMESPACE!
import { Vibration } from '@ionic-native/vibration'; 
import { DatePicker } from '@ionic-native/date-picker'; 

// importando HTTP
// import { Http } from '@angular/http';

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
    private _service: AgendamentoService,
    private _alertCtrl: AlertController,
    
    public vibration: Vibration,
    public datePicker: DatePicker) {

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

      this.vibration.vibrate(500);

      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deverá preencher todas as informações',
        buttons: [{ text: 'Ok'}]
      }).present();
      return;
    }

    this._service
      .agenda(this.agendamento)
      .then(confirmado => {
        confirmado ?
          this._alerta.setSubTitle('Agendamento realizado com sucesso') :
          this._alerta.setSubTitle('Não foi possível realizar o agendamento. Tente mais tarde!');
          this._alerta.present();
      })
      .catch(err => {
        console.log(err);
        this._alerta.setSubTitle(err.message);
        this._alerta.present();
      });

  }

  selecionaData() {

    this.datePicker.show({
      date: new Date(), 
      mode: 'date'
    })
    .then(data => this.agendamento.data = data.toISOString());
  }

}
