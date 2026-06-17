import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector:'app-transaction-form',
  templateUrl:'./transaction-form.component.html',
  styleUrls:['./transaction-form.component.scss']
})

export class TransactionFormComponent{

  form:FormGroup;

  successMessage:string='';

  constructor(
    private fb:FormBuilder
  ){

    this.form=this.fb.group({

      product:['',Validators.required],

      quantity:[
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      payment:['',Validators.required]

    });

  }

  submit():void{

    if(this.form.invalid){

      this.successMessage='Completa todos los campos';
      return;

    }

    this.successMessage=
    'Transacción registrada correctamente';

    this.form.reset();

  }

}
