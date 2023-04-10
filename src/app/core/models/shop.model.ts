import {Stock} from "./stock.model"

export interface Shop {
    name : string
    address : string
    stock : Stock[]
    stockId : any[]

}