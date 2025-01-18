// Creating Recative Forms
/*
// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponet} from directory;

@NgModel({
    declarations:[
        AppComponent
    ],
    imports:[
       BrowserModule,
       ReactiveFormsModule
    ],
    providers:[],
    bootstrap:[AppComponent]
});

export class AppModule {};


// ng generate component user-form
user-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector:"user-form",
    templateUrl:"./user-form.component.html",
    styleUrls:['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
    userForm: FormGroup;

    constructor(private fb: FormBuilder){}

    ngOnInit(): void {
        this.userForm = this.fb.group({
            name : ['',[Validators.required, Validators.minLength(3)]],
            email: ['',[Validators.email]],
            password: ['',[Validators.required, Validators.minLength(6)]] 
        });
    }

    onSubmit(): void {
        if(this.userForm.valid){
        
        } else {
         
        }
    }

    get_name() {
        return this.userForm.get('name');
    }

    get_email() {
        return this.userForm.get('email');
    }

    get_password() {
        return this.userForm.get('password');
    }

}


//user-form.component.html
<form [FormGroup]="userForm" (ngSubmit) = "OnSubmit()">
    <div>
        <label for="name"> Name : </label>
        <input id="name" formControlName="name" />
        <div *ngIf="name.invalid && name.dirty || name.touched">
            <div *ngIf="name.errors.required"> Name is required!
            </div>
            <div *ngIf="name.errors.minLength"> Name should have ateast 3!
            </div>
        </div> 
    </div>

    <div>
        <label for="email" > Email: </label>
        <input id="email" formControlName="email" />
        <div *ngIf="email.invalid && email.dirty || email.touched">
            <div *ngIf="email.errors.required"> Email is mandatory
            </div>
            <div *ngIf="email.errors.email"> Invalid email
            </div>
        </div>
    </div>

    <div>
        <label for="password"> Password : </label>
        <input id="password" type="password" formControlName="password" />

        <div *ngIf="password.invalid && password.touched || password.dirty">
            <div *ngIf="password.errors.required"> Password can't be null
            </div>
            <div *ngIf="password.errors.minLength"> Password is short
            </div>
        
        </div>
    </div>

    <button type="submit" [disabled]="userForm.invalid"> Save </button> 
</form>


//app.component.html
<user-form></user-form>

*/
