import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';

@Injectable()
export class AgendamentoService {

    constructor(private _http: Http, private _dao: AgendamentoDao) {}

    private _montaUri(agendamento: Agendamento) {
        return `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&data=${agendamento.data}`;
    }

    agenda(agendamento: Agendamento) {
      let api = this._montaUri(agendamento);

      return this._dao.ehAgendamentDuplicado(agendamento)
            .then(existe => {
                if(existe) throw new Error('Este agendamento já foi realizado!');
                // else
                return this._http
                    .get(api).toPromise()
                    .then(() => agendamento.confirmado = true , err => console.log(err))
                    .then(() => this._dao.salva(agendamento))
                    .then(() => agendamento.confirmado);
        })
    }

    reagenda(agendamento: Agendamento) {

        let api = this._montaUri(agendamento);
        return this._http
            .get(api)
            .toPromise()
            .then(() => agendamento.confirmado =  true, err => console.log )
            .then(() => this._dao.salva(agendamento))
            .then(() => agendamento.confirmado);
    }
}