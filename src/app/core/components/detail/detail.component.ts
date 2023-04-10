import { Product } from './../../models/product.model';
import { Component, Input } from '@angular/core';
import { Stock } from '../../models/stock.model';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  @Input() set id(value : number) {
    this.$shopService.getProductById(value).subscribe((p : Stock) => this.article = p)
  }
  article! : Stock

  constructor(private $shopService : ShopService){}

  ngOnInit(){
    console.log("init")

  }
}