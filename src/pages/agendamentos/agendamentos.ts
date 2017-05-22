import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';
import { Agendamento } from '../../domain/agendamento/agendamento';

@Component({
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage {

  public agendamentos: Agendamento[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _agendamentoDao: AgendamentoDao) {

      this._agendamentoDao
        .listaTodos()
        .then(agendamentos => this.agendamentos = agendamentos );

    }

}
