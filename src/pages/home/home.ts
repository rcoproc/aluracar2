import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public carros;

  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController, 
    private _alertCtrl: AlertController) { }

  ngOnInit() {

    let loader = this._loadingCtrl.create({
      content: 'Buscando novos carros. Aguarde ...'
    });

    loader.present();

    this._http
      .get('https://aluracar.herokuapp.com/')  // converte para JSON(map)
      .map(res => res.json())                  // Ver o mapeamento destes métodos em 
      .toPromise()                             // app.module.ts
      .then(carros => {
        this.carros = carros;                 // Resultado do json é armazenado na propriedade this.carros
        loader.dismiss();
      })
      .catch( 
          err => {
          console.log(err);                     // Fazendo o tratamento do erro no caso
          loader.dismiss();                     // de internet fora do Ar
          this._alertCtrl
            .create({
              title: 'Falha na conexão',
              buttons: [{ text: 'Estou ciente!' }],
              subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
          }).present();
      });
  }
}
