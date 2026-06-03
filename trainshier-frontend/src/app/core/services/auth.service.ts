import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class AuthService{

  users=[

    {
      role:'admin',
      email:'admin@trainshier.com',
      password:'Admin123',
      name:'Administrador'
    },

    {
      role:'instructor',
      email:'instructor@trainshier.com',
      password:'Instructor123',
      name:'Carlos Instructor'
    },

    {
      role:'aprendiz',
      email:'aprendiz@trainshier.com',
      password:'Aprendiz123',
      name:'Laura Aprendiz'
    }

  ];

  login(data:any):Observable<any>{

    const user=this.users.find(
      item=>
        item.email===data.email &&
        item.password===data.password
    );

    if(user){

      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );

      return of({
        success:true,
        user
      });

    }

    return of({
      success:false
    });

  }

  register(data:any):Observable<any>{

    this.users.push({
      role:'aprendiz',
      email:data.email,
      password:data.password,
      name:data.name
    });

    return of({
      success:true
    });

  }

  logout(){

    localStorage.removeItem('user');

  }

  getUser(){

    return JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  }

}
