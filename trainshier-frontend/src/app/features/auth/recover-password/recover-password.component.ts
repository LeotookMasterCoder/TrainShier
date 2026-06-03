import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

  successMessage = '';
  errorMessage = '';

  form = this.fb.group({

    email:['',[
      Validators.required,
      Validators.email
    ]],

    newPassword:['',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ]],

    confirmPassword:['',[
      Validators.required
    ]]
  });

  constructor(
    private fb:FormBuilder,
    private router:Router
  ){}

  submit():void{

    this.errorMessage = '';
    this.successMessage = '';

    if(this.form.invalid){
      this.form.markAllAsTouched();
      this.errorMessage = 'Completa correctamente todos los campos.';
      return;
    }

    const password = this.form.value.newPassword;
    const confirm = this.form.value.confirmPassword;

    if(password !== confirm){
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.successMessage =
      'Contraseña actualizada correctamente.';

    setTimeout(()=>{
      this.router.navigate(['/login']);
    },1500);
  }

  back():void{
    this.router.navigate(['/login']);
  }

}
