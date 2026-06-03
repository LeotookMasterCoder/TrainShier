import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class ProductService {

  products = [
    {
      name:'Arroz',
      quantity:30,
      price:3000
    },
    {
      name:'Leche',
      quantity:15,
      price:4500
    },
    {
      name:'Pan',
      quantity:40,
      price:1000
    }
  ];

}
