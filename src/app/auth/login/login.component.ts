import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector:"app-login",
    templateUrl:"./login.component.html",
    styleUrls:["./login.component.scss"]
})
export class LoginComponent implements OnInit{
    isLoading = false;

    constructor(private authService: AuthService) {

    }

    ngOnInit() {

    }

    onLogin(loginFom:NgForm) {
        this.isLoading = true;
        if(loginFom.invalid){
            return;
        }
        this.authService.login(loginFom.value.email, loginFom.value.password);
    }
}