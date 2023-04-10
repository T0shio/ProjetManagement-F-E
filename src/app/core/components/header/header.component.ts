import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  total : number = 0
  nbr : number = 0

  etat! : boolean
  get user() : any {
    if(localStorage.getItem("user") != null) {
      return JSON.parse(localStorage.getItem("user")!)
    }
    return null;
  }

  // get currentPageTitle() : string | undefined {
  //   switch (this.router.url) {
  //     case "/admin/create":
  //       return "Ajouter un produit"
  //     case "/admin/list":
  //       return "Liste des produits"
  //     case "/404":
  //       return "Ressource introuvable"
  //     case "/admin/update/\?.*":
  //       return "Mise à jour du produit"
  //     default:
  //       return this.router.url
  //   }
  
  get currentPageTitle(): string | undefined { 
    const match = this.router.url.match(/^\/admin\/update\/(\d+)$/); 
      if (match) { const id = match[1]; return `Mise à jour du produit ${id}`; } 
    switch (this.router.url) { 
      case "/admin/create": 
    return "Ajouter un produit"; 
      case "/admin/list": 
    return "Liste des produits"; 
      case "/404": 
    return "Ressource introuvable";
      case "/login":
    return "Page d'authentification";
      default: 
    return this.router.url;
    } 
  }

  login() {
    this.$userService.logout()
    this.router.navigate(['/login'])
  }

  testAuth() {
    this.$userService.testAuth()
  }

  constructor(
    private $stockService : StockService,
    private $userService : UserService,
    private router : Router
    ){}

  ngOnInit() {

    this.$stockService.totalSubject.subscribe({
      next : (data : number) => {
        this.total = data
      }
    })
    this.$stockService.nbrSubject.subscribe({
      next : (data : number) => {
        this.nbr = data
      }
    })
    console.log("init app")
    }
}