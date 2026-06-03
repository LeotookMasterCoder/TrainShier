import { Injectable } from '@angular/core';

import { Observable,of } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class TransactionService {

  private transactions=[

    {
      product:'Coca Cola',
      quantity:5,
      total:15000
    },

    {
      product:'Arroz',
      quantity:3,
      total:9000
    }

  ];

  getAll():Observable<any>{

    return of(this.transactions);
  }

  create(data:any):Observable<any>{

    this.transactions.push(data);

    return of(data);
  }

}
