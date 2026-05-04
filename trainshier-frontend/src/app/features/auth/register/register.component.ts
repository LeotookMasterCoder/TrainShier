import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private auth: AuthService){}

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['APPRENTICE']
  });

  submit(){
    if(this.form.valid){
      this.auth.register(this.form.value).subscribe();
    }
  }
}
