import { Product } from './../core/models/product.model';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Shop } from './../core/models/shop.model';
import { Injectable } from '@angular/core';
import { Stock } from '../core/models/stock.model';
import { mergeMap, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  Shop! : Shop
  private url :string = environment.url
  constructor(
    private $client : HttpClient
  ) { }

  ajoutQty() {}

  reduireQty(article : Stock) : Observable<void> | null{
    if(article.quantity > 0) {
      article.quantity--
      return this.$client.patch<void>(this.url+"/stock/"+article.id, article)
    }
    return null
  }

  ajoutProduit(newStock : Stock) : Observable<void> {
    return this.$client.post<void>(this.url+"/stock", newStock)
  }

  getProductById(id : number) : Observable<Stock> {
    return this.$client.get<Stock>(this.url+"/stock/"+id)
  }

  getShop() : Observable<Shop> {
    return this.$client.get<Shop>(this.url+"/shop").pipe(mergeMap((m : Shop) => {
     return this.$client.get<Stock[]>(this.url+"/stock?shopId").pipe(map((s : Stock[]) =>
      {
        m.stock = s
            return m
      }
     ))
    }
    ))
    

}
}