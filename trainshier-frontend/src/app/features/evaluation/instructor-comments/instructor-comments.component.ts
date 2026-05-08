import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-instructor-comments',
  templateUrl: './instructor-comments.component.html',
  styleUrls: ['./instructor-comments.component.scss']
})
export class InstructorCommentsComponent implements OnInit {

  comments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ReportService
  ){}

  form = this.fb.group({
    apprentice: ['', Validators.required],
    comment: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(){
    this.service.getComments().subscribe((res: any) => {
      this.comments = res;
    });
  }

  submit(){

    if(this.form.valid){

      this.service.createComment(this.form.value).subscribe(() => {

        this.form.reset();

        this.loadComments();
      });
    }
  }
}
