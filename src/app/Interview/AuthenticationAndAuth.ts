/* 

ng generate service auth

auth.service.ts

import {Injectable} from core
import {HttpClient} from common/http
import {Router} from router
import {Obsetvable,of} from rxjs
import {catchError, tap} from rxjs/operators;

export class AuthService {
    url =".....";

    constructor(pvt http: httpClient, pvt router:Router){}

    login(creds:{pass:strig, email:string}): Observable<any> {
        return this.http.post(`${this.url}/login`,creds).pipe(
            tap((response:any)=>this.setSession(response)),
            catchError((error)=> of(error))
        );
    }

    private setSession(authResult: any) {
        localStorage.setItem('id_token',authResult.tokem);
        localstorgae.setItem('expier_at',authresult.expierin)
    }

    logoutt(): void{
        removeItem('id_token')
        this.router.navigate['/login']
    }

    isLoggedIn: boolean {
        const expiresAt = localStorage.getItem('expire_at')
        return expireAt && new Date().getTime() < +expireAt;
        }
}

// protect routes from Guards
ng generate guard auth

import {injectable}
import {CanActivate, Router}  router
import Auth servuce

@Injectable({
    providedIn:'root'
})

export calds AuthGuard implemenst Canactivate 
{
    constructor(auth: AUthesrvice, router:Router){}

    canActivayte(): boolean {
        if(!this.Authservciue.isLoggedIn)
        {
            this.router.navigate([./login]);
            return false;
        }
            else{
            return true
            }
    }
}

// routingmodule

{path:'dashboard', componetn:DashboardComponent, canActivate:[AuthGuard]}


*/