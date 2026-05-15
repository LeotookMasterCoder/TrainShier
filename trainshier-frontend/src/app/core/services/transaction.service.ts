import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get(this.url);
  }

  create(data: any){
    return this.http.post(this.url, data);
  }
}
