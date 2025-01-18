/*
//ng generate service data
data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService{
    private apiUrl = "https://jsonplaceholder.typicode.com";

    constructor(private http: HttpClient){}

    getData(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}

// app.module.ts
 import { HttpClientModule } from '@angular/common/http';
 import { NgModule } from '@angular/core';
 import { BrowserModule } from '@angular/ptform-browser';

 @NgModel({
    declarations:[
        AppComponent
    ],
    imports:[
        BrowserModule,
        HttpClientModule
    ],
    providers:[],
    bootstrap:[AppComponent]
 })

 export class AppModule {}

//ng generate component user-data
// user-data.component.html

import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selevtor:
    templateUrl:'./user-data.component.html'
    styleUrls:['']
})

export class UserDataComoponent implements OnInit {
    data:any;
    constructor(private ds:DataService){}

    ngOnInit(): void {
        this.ds.getData().subscribe((response) => {
        },(error)=>{
        });
    }
}



*/