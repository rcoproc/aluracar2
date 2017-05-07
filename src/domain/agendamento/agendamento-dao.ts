import { Injectable } from '@angular/core';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { Storage } from '@ionic/storage';

@Injectable()
export class AgendamentoDao {
    constructor(private _storage: Storage) {

    }

    private _getKey(agendamento: Agendamento) {
        return agendamento.email + agendamento.data.substr(0,10);
    }

    salva(agendamento: Agendamento) {
        let key = this._getKey(agendamento)
        return this._storage.set(key, agendamento);
    }

    ehAgendamentDuplicado(agendamento: Agendamento) {
        let key = this._getKey(agendamento);

        return this._storage
            .get(key)
            .then(dado => { 
                return dado ? true : false
            });

    }
}