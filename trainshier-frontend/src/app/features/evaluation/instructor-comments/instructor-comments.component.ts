import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-comments',
  templateUrl: './instructor-comments.component.html',
  styleUrls: ['./instructor-comments.component.scss']
})
export class InstructorCommentsComponent implements OnInit {
  nombreAprendiz: string = 'Carlos Ramírez';

  puntaje: number = 82;

  tiempo: number = 14;

  errores: number = 3;

  aiAnalysis: string = 'Analizando desempeño...';

  notification: string = '';

  comment: any = {

    studentName: '',

    module: '',

    score: '',

    state: '',

    feedback: '',

    errors: ''

  };

  comments: any[] = [];

  ngOnInit(): void {

    const savedComments =
      localStorage.getItem('comments');

    if (savedComments) {

      this.comments =
        JSON.parse(savedComments);

    }

    this.generateAIAnalysis();

    setTimeout(() => {

      this.notification =
        'El aprendiz terminó correctamente la simulación.';

    }, 1500);

  }

  generateAIAnalysis(): void {

    if (this.puntaje >= 90) {

      this.aiAnalysis =
        'Excelente desempeño. El aprendiz domina los procesos POS, la atención al cliente y la gestión de promociones.';

    }

    else if (this.puntaje >= 70) {

      this.aiAnalysis =
        'Buen rendimiento general. Se recomienda reforzar la velocidad de atención y el cálculo correcto del cambio al cliente.';

    }

    else {

      this.aiAnalysis =
        'Se requiere práctica adicional. Es recomendable fortalecer el manejo de descuentos, procesos POS y validación de productos.';

    }

  }

  saveComment(): void {

    if (

      !this.comment.studentName ||

      !this.comment.module ||

      !this.comment.score ||

      !this.comment.state ||

      !this.comment.feedback

    ) {

      this.notification =
        'Completa todos los campos obligatorios.';

      return;

    }

    this.comments.unshift({

      ...this.comment,

      date:
        new Date().toLocaleDateString()

    });

    localStorage.setItem(

      'comments',

      JSON.stringify(this.comments)

    );

    this.notification =
      'Evaluación guardada correctamente.';

    this.comment = {

      studentName: '',

      module: '',

      score: '',

      state: '',

      feedback: '',

      errors: ''

    };

  }

  deleteComment(index: number): void {

    this.comments.splice(index, 1);

    localStorage.setItem(

      'comments',

      JSON.stringify(this.comments)

    );

    this.notification =
      'Evaluación eliminada correctamente.';

  }

  exportEvaluation(): void {

    this.notification =
      'Función de exportación disponible próximamente.';

  }

  @HostListener('document:keydown.enter')

  handleEnter(): void {

    const buttons =
      document.querySelectorAll('button');

    if (buttons.length > 0) {

      (buttons[0] as HTMLButtonElement).focus();

    }

  }

  getApprovedCount(): number {

    return this.comments.filter(

      comment =>
        comment.state === 'Aprobado'

    ).length;

  }

  getRejectedCount(): number {

    return this.comments.filter(

      comment =>
        comment.state === 'No aprobado'

    ).length;

  }

  getAverageScore(): number {

    if (this.comments.length === 0) {

      return 0;

    }

    const total =
      this.comments.reduce(

        (sum, item) =>
          sum + Number(item.score),

        0

      );

    return Math.round(

      total / this.comments.length

    );

  }

}
