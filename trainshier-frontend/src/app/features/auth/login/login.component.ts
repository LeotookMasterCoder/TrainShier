import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector:'app-login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.scss']
})
export class LoginComponent{

  showConfirm:boolean=false;

  previewUser:any={};

  form=this.fb.group({

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
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
        )
      ]
    ]

  });

  constructor(
    private fb:FormBuilder,
    private router:Router
  ){}

  validateLogin():void{

    if(this.form.invalid){

      this.form.markAllAsTouched();
      return;

    }

    const email=this.form.value.email;

    if(email==='admin@trainshier.com'){

      this.previewUser={
        name:'Administrador Principal',
        email,
        role:'ADMIN'
      };

    }else if(email==='instructor@trainshier.com'){

      this.previewUser={
        name:'Instructor Demo',
        email,
        role:'INSTRUCTOR'
      };

    }else{

      this.previewUser={
        name:'Aprendiz Demo',
        email,
        role:'APRENDIZ'
      };

    }

    this.showConfirm=true;

  }

  login():void{

    localStorage.setItem(
      'token',
      'trainshier-token'
    );

    localStorage.setItem(
      'role',
      this.previewUser.role
    );

    localStorage.setItem(
      'name',
      this.previewUser.name
    );

    localStorage.setItem(
      'email',
      this.previewUser.email
    );

    this.router.navigate(['/home']);

  }

}
