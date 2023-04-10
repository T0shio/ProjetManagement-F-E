import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Providerr } from 'src/app/core/models/provider.model';
import { Stock } from 'src/app/core/models/stock.model';
import { ProviderService } from 'src/app/services/provider.service';
import { ShopService } from 'src/app/services/shop.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent {


  fg! : FormGroup
  fgPro! : FormGroup
  providers! : Providerr[]
  newProvider: Providerr | undefined
  updateProvider: Providerr | undefined

  constructor(
    private $formBuilder : FormBuilder,
    private $shopService : ShopService,
    private $stockservice: StockService,
    private $providerservice: ProviderService
    ) {
      this.initProviders()
    }

  ngOnInit() {
    this.initForm()
    this.initFormPro()
  }
  initProviders() {
    this.$providerservice.getAll().subscribe((providers: Providerr[]) => {
      this.providers = providers
      console.log(providers)
    })
  }
  initFormPro() {
    this.fgPro = this.$formBuilder.group({
        selectedProvider : [null, Validators.minLength(2)],
        name: [null, Validators.minLength(2)]
      })
    }

  initForm() {
    this.fg = this.$formBuilder.group({
      product : this.$formBuilder.group({
        name : [null, Validators.minLength(2)],
        description : [null, Validators.required],
        price : [null, Validators.min(0)],
        brand : [null, Validators.minLength(2)]
      }),
      quantity : [1]
    })
  }

  initNewProvider() {
    this.newProvider = {
      id: null,
      name: "",
    }
  }

  selectProviderToUpdate(value: string) {
    this.newProvider = undefined;
    this.updateProvider = this.providers.find(p => p.name === value)
    this.fgPro.setValue({
      name: this.updateProvider?.name,
      selectedProvider: this.updateProvider?.name
    })
  }

  submitForm() {
    if (this.newProvider) {
      this.addProvider();
    }

    if (this.updateProvider && this.updateProvider.id) {
      this.$providerservice.update({
        id: this.updateProvider.id,
        name: this.fgPro.controls["name"].value
      }).subscribe()
    }
  }

  addProduct() {
    this.$stockservice.create(this.fg.value as Stock).subscribe( () =>{
      alert("Article Enregistré")
      this.initForm()})
  }

  addProvider(){
    this.$providerservice.create(this.fgPro.value as Providerr).subscribe (() => {
      console.log(this.fgPro.value)
      this.initFormPro()
      this.initProviders()
    }
  )
  }
}