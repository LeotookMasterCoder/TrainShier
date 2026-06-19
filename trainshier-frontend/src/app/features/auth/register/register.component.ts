import { Component } from '@angular/core';

import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector:'app-register',
  templateUrl:'./register.component.html',
  styleUrls:['./register.component.scss']
})
export class RegisterComponent {

  generatedId:string = '';

  successMessage:string = '';

  errorMessage:string = '';

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService
  ){

    this.generateId();

  }

  form = this.fb.group({

    fullName:[
      '',
      Validators.required
    ],

    role:[
      'APRENDIZ',
      Validators.required
    ],

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
        Validators.required,
        Validators.minLength(6)
      ]
    ]

  });

  generateId():void{

    const random =
      Math.floor(
        1000 + Math.random() * 9000
      );

    this.generatedId =
      `TRN-${random}`;

  }

  register():void {

    if(this.form.invalid){

      this.form.markAllAsTouched();

      return;
    }

    const request = {

      name:this.form.value.fullName,

      email:this.form.value.email,

      password:this.form.value.password,

      role:this.form.value.role

    };

    this.authService
      .register(request)
      .subscribe({

        next:(response)=>{

          this.successMessage =
            response.message ||
            'Usuario registrado correctamente';

          setTimeout(()=>{

            this.router.navigate(['/login']);

          },2000);

        },

        error:(err)=>{

          this.errorMessage =
            err.error?.message ||
            'Error al registrar usuario';

        }

      });

  }

  back():void{

    this.router.navigate(['/']);

  }

}
