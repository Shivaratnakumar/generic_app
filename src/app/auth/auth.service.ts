import { AuthData } from './auth-data.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn:"root"
})
export class AuthService {
    signupUrl = "http://localhost:3000/api/users/signup";
    loginUrl = "http://localhost:3000/api/users/login";

    private token:string = ""; 
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated:boolean = false;
    private tokenTimer!: NodeJS.Timer;
    constructor(private http:HttpClient, private router:Router) {}

    getToken(){
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    createUser(email:string,password:string){
        const authdata: AuthData = {
            email: email,
            password:password
        };
        this.http.post(this.signupUrl,authdata).subscribe((response)=>{
            // console.log("response ::",response);
        });
    }

    autoAuthUser(){
        const authInformation = this.getAuthData();
        const now = new Date();
        if(!authInformation){
            return;
        }
        if(authInformation?.expirationDate){
            const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
            if(expiresIn > 0){
                this.token =authInformation.token;
                this.isAuthenticated = true;
                this.setAuthTimer(expiresIn/1000);
                this.authStatusListener.next(true);
            }
        }
        
        

    }

    login(email:string,password:string) {
        const authdata: AuthData = {
            email: email,
            password:password
        };
        this.http.post<{message:string, token:string, expiresIn:number}>(this.loginUrl,authdata).subscribe((response)=>{
            const token = response.token;
            this.token = token;
            // console.log("response ::",response);
            if(this.token){
                
                const expiresInDuration = response.expiresIn;
                const now = new Date();
                const expdate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthdata(token,expdate);
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.router.navigate(["/"]);
            }
           
        });
    }

    logout(){
        this.token = "";
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    }

    private saveAuthdata(token:string, expirationDate:Date){
        localStorage.setItem("token",token);
        localStorage.setItem("expiration",expirationDate.toISOString());
    }

    private clearAuthData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");

        if(!token || !expirationDate){
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

    private setAuthTimer(duration: number){
        this.tokenTimer = setTimeout(()=>{
            this.logout();
        }, duration * 1000);
    }
}