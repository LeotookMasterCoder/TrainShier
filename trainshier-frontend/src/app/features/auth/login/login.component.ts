import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private token: TokenService
  ){}

  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  submit(){
    if(this.form.valid){
      this.auth.login(this.form.value).subscribe((res: any)=>{
        this.token.save(res.token);
      });
    }
  }
}
