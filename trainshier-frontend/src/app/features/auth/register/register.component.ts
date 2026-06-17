import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector:'app-register',
  templateUrl:'./register.component.html',
  styleUrls:['./register.component.scss']
})
export class RegisterComponent{

  generatedId = '';
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({

    fullName:['', [
      Validators.required,
      Validators.minLength(4)
    ]],

    username:['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+#[0-9]{4}$/)
    ]],

    role:['aprendiz', Validators.required],

    email:['', [
      Validators.required,
      Validators.email
    ]],

    password:['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ]]
  });

  constructor(
    private fb:FormBuilder,
    private router:Router
  ){
    this.generateId();
  }

  generateId():void{
    const random = Math.floor(1000 + Math.random() * 9000);
    this.generatedId = `TRN-${random}`;
  }

  register():void{

    this.errorMessage = '';
    this.successMessage = '';

    if(this.form.invalid){
      this.form.markAllAsTouched();
      this.errorMessage = 'Completa correctamente todos los campos.';
      return;
    }

    this.successMessage =
      `Cuenta creada exitosamente. ID asignado: ${this.generatedId}`;

    setTimeout(()=>{
      this.router.navigate(['/login']);
    }, 2000);
  }

  back():void{
    this.router.navigate(['/']);
  }

}
