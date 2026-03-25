import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TransaccionService {

  api = 'http://localhost:8080/api/transacciones';

  constructor(private http: HttpClient) {}

  listar(){
    return this.http.get<any[]>(this.api);
  }

  comentar(id:number, comentario:string){
    return this.http.put(`${this.api}/comentario/${id}`, {comentario});
  }

}