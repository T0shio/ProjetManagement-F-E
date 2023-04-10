import { Stock } from './../core/models/stock.model';
import { ShopService } from './shop.service';
import { Product } from './../core/models/product.model';
import { Injectable } from '@angular/core';
import { Shop } from '../core/models/shop.model';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Stock[] = []
  constructor(private $shop : ShopService) {
    
   }

   getByShop(): Observable<Stock[]> {
    const subject = new BehaviorSubject<Stock[]>(this.productList)

    if (this.productList.length <= 0) {
      this.$shop.getShop().subscribe(shop => subject.next(shop.stock))
    }

    return subject
   }

  getProductById() {

  }
}