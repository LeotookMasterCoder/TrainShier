import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

  message = '';

  constructor(private fb: FormBuilder){}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submit(){

    if(this.form.invalid){

      alert('Entra un email válido con cuenta');

      return;
    }

    const code =
      Math.floor(100000 + Math.random() * 900000);

    this.message =
      `Código de verificación enviado correctamente: ${code}`;

    alert(
      `Código de recuperación enviado a:  ${this.form.value.email}`
    );

  }

}
