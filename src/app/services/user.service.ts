import { User } from './../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environments';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

// D'abord faire une page pour se log 
// Ensuite, faire en sorte que l'utilisateur doit se connecter s'il ne l'a pas encore fait
// => Faire un AuthGuard qui sera appliqué sur toutes les routes sauf login
// Dans le guard : 
// - Récupérer le token qui est dans le localStorage 
//  => Si il existe pas, tu logout et tu navigues vers /login
//  => Sinon, renvoie vrai

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static KEY_TOKEN = "token"

  static getToken() {
    return sessionStorage.getItem(this.KEY_TOKEN)
  }

  private url : string = environment.url

  constructor(
    private $client : HttpClient
  ) { }

  login(login : string, pwd : string) {
    // this.$client.get<User[]>(this.url+"/user").subscribe((data : User[]) => {
    //   data.forEach((el : User) => {
    //     if(el.login == login && el.password == pwd){
    //       localStorage.setItem("userInfo", JSON.stringify({login : el.login, role : el.role}))
    //     }
    //   })
    // })
    return this.$client.post<any>(this.url + "/login", {
      username: login,
      password: pwd
    }).pipe(map((data : any) => {
      this.setToken(data.token)
    }))
  }

  logout() {
    this.clearToken()
  }

  testAuth() {
    this.$client.get(this.url + "/testAuth")
    .subscribe((res : any) => console.log(res))
  }

  // Token

  setToken(token : string) {
    sessionStorage.setItem(UserService.KEY_TOKEN, JSON.stringify(token).slice(1, -1))
  }

  clearToken() {
    sessionStorage.removeItem(UserService.KEY_TOKEN)
  }


}
