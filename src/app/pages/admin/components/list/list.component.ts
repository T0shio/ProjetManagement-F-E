import { Component } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { StockService } from 'src/app/services/stock.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Stock } from 'src/app/core/models/stock.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  list: Stock[] = []
  selectedIndex! : number
  displayedColumns: string[] = ['name', 'price', 'quantity', 'brand', 'update', 'delete'];

  constructor(
    private router : Router,
    private $productService : ProductService,
    private $shopService : ShopService,
    private $stockService : StockService
    ) {

  }

  ngOnInit() {

   this.loadItems()

  }

  loadItems(){
    this.$stockService.getAll().subscribe( (data: Stock[]) => {console.log(data); this.list = data} )
  }
  delete(stock : Stock){
    this.$stockService.delete(stock).subscribe(
      () => this.loadItems()
    )
  }
  update(id : number){
    this.router.navigate(['/admin/update/' + id])
  }
  
  showDetail(id :number){
    this.selectedIndex = id
  }
}
