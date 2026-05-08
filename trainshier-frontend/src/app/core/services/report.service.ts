import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get(this.url);
  }

  getStatistics(){
    return this.http.get(`${this.url}/statistics`);
  }

  createComment(data: any){
    return this.http.post(`${this.url}/comments`, data);
  }

  getComments(){
    return this.http.get(`${this.url}/comments`);
  }
}
