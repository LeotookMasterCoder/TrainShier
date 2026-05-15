import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html'
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {

  @Output() created = new EventEmitter();

  constructor(private fb: FormBuilder, private service: TransactionService){}

  form = this.fb.group({
    total: [0, Validators.required],
    method: ['', Validators.required],
    status: ['SUCCESS']
  });

  submit(){
    this.service.create(this.form.value).subscribe(()=>{
      this.created.emit();
    });
  }
}
