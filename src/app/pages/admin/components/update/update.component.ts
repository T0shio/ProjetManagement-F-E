import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Providerr } from 'src/app/core/models/provider.model';
import { Stock } from 'src/app/core/models/stock.model';
import { ProviderService } from 'src/app/services/provider.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  fgPro! : FormGroup
  fg! : FormGroup
  stock! : Stock
  id! : number
  name! : string

  constructor(
    private $stockService : StockService,
    private $route : Router,
    private $activatedRoute: ActivatedRoute,
    private $formBuilder: FormBuilder,
    private $providerService : ProviderService
  ){
    
  }

  ngOnInit(){
    this.initForm()
    this.id = this.$activatedRoute.snapshot.params['id']
    this.$stockService.readOneByKey(this.id).subscribe( (data : Stock) => {
      this.stock = data
      console.log(this.stock + "data")
      this.fg.patchValue(this.stock)
      console.log(this.fg.value)
    } )
  }


  initForm() {
    // this.fg = this.$formBuilder.group({
    //   product : this.$formBuilder.group({
    //     name : [this.stock.product.name],
    //     description : [this.stock.product.description, Validators.required],
    //     price : [this.stock.product.price, Validators.min(0)]
    //   }),
    //   quantity : [this.stock.quantity]
    // })
    this.fg = this.$formBuilder.group({
      product : this.$formBuilder.group({
        name : [null],
        brand : [null],
        price : [null],
        id: [null]
      }),
      quantity : [null]
    })
  }
  initFormPro() {
    this.fgPro = this.$formBuilder.group({
        selectedProvider : [null, Validators.minLength(2)],
        name: [null, Validators.minLength(2)]
      })
    }

  updateStock(){
    this.$stockService.update(this.id, this.fg.value as Stock).subscribe(
      () =>{
        console.log(this.fg.value);
        
        this.$route.navigate(['/admin/list'])}
    )
  }
  updateProvider(){
    this.$providerService.update(this.fgPro.value as Providerr).subscribe(
      () => this.$route.navigate(['/admin/create']))
  }

}
