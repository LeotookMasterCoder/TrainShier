import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  profileImage = 'assets/img/default-profile.png';

  showMenu = false;

  constructor(private fb: FormBuilder){}

  form = this.fb.group({

    fullName: [
      'Darwing Andres',
      Validators.required
    ],

    username: [
      'darwing#5462',
      Validators.required
    ],

    phone: [
      '',
      Validators.required
    ],

    city: [
      '',
      Validators.required
    ],

    description: [''],

    email: [
      {
        value: 'darwing@gmail.com',
        disabled: true
      }
    ],

    role: [
      {
        value: 'APPRENTICE',
        disabled: true
      }
    ],

    id: [
      {
        value: 'TRN-82913',
        disabled: true
      }
    ]
  });

  toggleMenu(){

    this.showMenu = !this.showMenu;

  }

  onImageChange(event: any){

    const file = event.target.files[0];

    if(file){

      const reader = new FileReader();

      reader.onload = () => {

        this.profileImage = reader.result as string;

      };

      reader.readAsDataURL(file);

    }

  }

  saveChanges(){

    alert('Perfil actualizado correctamente');

  }

}
