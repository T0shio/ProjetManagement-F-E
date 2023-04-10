import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { UserService } from "src/app/services/user.service"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    hide = true
    fg! : FormGroup
  
    constructor(
      private $service : UserService, 
      private $formBuilder : FormBuilder,
      private router : Router){}
  
  
    login() {
      this.$service.login(this.fg.value.login, this.fg.value.pwd)
        .subscribe(() => this.router.navigate(['/admin/create']))
    }

    ngOnInit(): void {
      this.initForm()
    }

    initForm() {
      this.fg = this.$formBuilder.group({
        login : [null],
        pwd: [null]
      })
    }
  }