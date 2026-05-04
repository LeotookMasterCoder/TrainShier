import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {

  data: any[] = [];

  constructor(private service: TransactionService){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.service.getAll().subscribe((res: any)=>{
      this.data = res;
    });
  }
}
