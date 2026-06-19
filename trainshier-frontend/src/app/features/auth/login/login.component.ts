import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector:'app-login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.scss']
})
export class LoginComponent {

  showConfirm:boolean = false;

  previewUser:any = {};

  errorMessage:string = '';

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService
  ){}

  form = this.fb.group({

    email:[
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password:[
      '',
      [
        Validators.required
      ]
    ]

  });

  validateLogin():void {

    if(this.form.invalid){

      this.form.markAllAsTouched();

      return;
    }

    this.previewUser = {

      email:this.form.value.email,

      name:'Usuario',

      role:'APRENDIZ'

    };

    this.showConfirm = true;
  }

  login():void {

    this.authService.login(this.form.value)
      .subscribe({

        next:(response)=>{

          this.previewUser = {

            name:response.name,

            email:this.form.value.email,

            role:response.role

          };

          this.router.navigate(['/home']);

        },

        error:(err)=>{

          this.errorMessage =
            err.error?.message ||
            'Correo o contraseña incorrectos';

        }

      });

  }

}
