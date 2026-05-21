import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private token: TokenService,
    private router: Router
  ){}

  form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).+$/)
      ]
    ]
  });

  submit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.login(this.form.value).subscribe({

      next: (res: any) => {

        this.token.save(res.token);

        const role = res.role || 'Aprendiz';

        alert(`Bienvenidos a TrainShier (${role})`);

        this.router.navigate(['/home']);

        this.loading = false;
      },

      error: () => {

        this.errorMessage =
          'Credenciales invalidas o error en el servidor';

        this.loading = false;
      }
    });
  }
}
