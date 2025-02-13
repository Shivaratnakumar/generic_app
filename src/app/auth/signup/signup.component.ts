import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector:"app-signup",
    templateUrl:"./signup.component.html",
    styleUrls:["./signup.component.scss"]
})
export class SignupComponent implements OnInit{
    isLoading = false;

    constructor(private authService: AuthService) {

    }

    ngOnInit() {

    }

    onSignup(signupFom:NgForm) {
        this.isLoading = true;
        if(signupFom.invalid){
            return;
        }

        this.authService.createUser(signupFom.value.email, signupFom.value.password);
    }
}