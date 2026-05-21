import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){}

  form = this.fb.group({

    username: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+#[0-9]{4}$/)
      ]
    ],

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

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
    ],

    role: ['APPRENTICE']
  });

  submit(){

    if(this.form.invalid){

      this.form.markAllAsTouched();

      this.errorMessage =
        'Please complete all fields correctly';

      return;
    }

    this.auth.register(this.form.value).subscribe({

      next: () => {

        this.successMessage =
          'User successfully registered';

        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: () => {

        this.errorMessage =
          'Error registering user';
      }
    });
  }
}
