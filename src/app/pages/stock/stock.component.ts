import { StockService } from './../../services/stock.service';
import { Stock } from './../../core/models/stock.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {

  stock! : Stock[]
  total : number = 0

  constructor(private $stockService : StockService){}

  ngOnInit() {
    this.stock = this.$stockService.myStock
    this.stock.forEach((el : Stock) => this.total += (el.product.price * el.quantity))
  }
}
