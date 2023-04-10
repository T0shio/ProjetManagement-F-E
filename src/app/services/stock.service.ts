import { Observable, Subject } from 'rxjs';
import { Product } from './../core/models/product.model';
import { Injectable } from '@angular/core';
import { Stock } from '../core/models/stock.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url : string = environment.url
  constructor(
    private $client : HttpClient
  ) { }

  getAll() : Observable<Stock[]>{
    return this.$client.get<Stock[]>(this.url+"/stocks")
  }

  create(stock : Stock) : Observable<void>{
    console.log(stock.product)
    return this.$client.post<void>(this.url+"/stocks", stock)
  }
  delete(stock : Stock) : Observable<void> {
    return this.$client.delete<void>(this.url+"/stocks/"+stock.id)
  }
  update(id : number, stock : Stock) : Observable<void> {
    return this.$client.put<void>(this.url+"/stocks/"+ id,stock)
  }

  readOneByKey(id: number) : Observable<Stock> {
    return this.$client.get<Stock>(this.url+'/stocks/'+ id)
  }
  
  myStock : Stock[] = []
  total : number = 0
  nbrArticle : number = 0

  totalSubject : Subject<number> = new Subject<number>()
  nbrSubject : Subject<number> = new Subject<number>()
  


  // ajouterProduit(product : Product) {
  //   let index = this.myStock.findIndex(p => p.product == product)
  //   if(index > -1)
  //     this.myStock[index].quantity++
  //   else
  //     this.myStock.push({product : product, quantity : 1})

  //   this.nbrArticle += 1
  //   this.total += product.price
  //   this.totalSubject.next(this.total)
  //   this.nbrSubject.next(this.nbrArticle)

  // }
}
