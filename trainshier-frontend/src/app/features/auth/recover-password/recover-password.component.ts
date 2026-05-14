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

      alert('Please enter a valid email');

      return;
    }

    const code =
      Math.floor(100000 + Math.random() * 900000);

    this.message =
      `Verification code sent successfully: ${code}`;

    alert(
      `Recovery code sent to ${this.form.value.email}`
    );

  }

}
