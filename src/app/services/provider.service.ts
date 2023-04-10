import { HttpClient } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Providerr } from "../core/models/provider.model";

@Injectable({
    providedIn: 'root'
  })
  export class ProviderService {
  
    private url : string = environment.url
    constructor(
      private $client : HttpClient
    ) { }

    getAll() : Observable<Providerr[]>{
        return this.$client.get<Providerr[]>(this.url+"/provider")
      }
    
      create(provider : Providerr) : Observable<void>{
        return this.$client.post<void>(this.url+"/provider", provider)
      }
      delete(provider : Providerr) : Observable<void> {
        return this.$client.delete<void>(this.url+"/provider/"+provider)
      }
      update(provider : Providerr) : Observable<void> {
        console.log(this.url+"/provider")
        return this.$client.put<void>(this.url+"/provider",provider)
      }
    
      readOneByKey(id: number) : Observable<Providerr> {
        return this.$client.get<Providerr>(this.url+'/provider/'+ id)
      }
}