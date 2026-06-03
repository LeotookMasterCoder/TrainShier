import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-comments',
  templateUrl: './instructor-comments.component.html',
  styleUrls: ['./instructor-comments.component.scss']
})
export class InstructorCommentsComponent implements OnInit {

  nombreAprendiz = 'Carlos Ramírez';
  puntaje = 82;
  tiempo = 14;
  errores = 3;

  notification = '';

  comment:any = {
    studentName:'',
    module:'',
    score:'',
    state:'',
    feedback:'',
    errors:''
  };

  comments:any[] = [];

  ngOnInit(): void {

    const saved = localStorage.getItem('comments');

    if(saved){

      this.comments = JSON.parse(saved);
    }

    setTimeout(() => {

      this.notification =
      'El aprendiz terminó el modo examen correctamente.';

    },1500);
  }

  saveComment(){

    this.comments.unshift({...this.comment});

    localStorage.setItem(
      'comments',
      JSON.stringify(this.comments)
    );

    this.notification =
    'Comentario guardado correctamente';

    this.comment = {
      studentName:'',
      module:'',
      score:'',
      state:'',
      feedback:'',
      errors:''
    };
  }

  @HostListener('document:keydown.enter')
  handleEnter(){

    const buttons =
    document.querySelectorAll('button');

    if(buttons.length > 0){

      (buttons[0] as HTMLButtonElement).focus();
    }
  }
}
