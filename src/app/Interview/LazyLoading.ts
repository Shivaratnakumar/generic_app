/*
load only when they  are needed.

//create feature Module
ng generate module dashboard --route dashboard --module app.module

ng generate module dashboard
ng generate component dashboard

dashboard-routing.module.ts

import {NgModule} from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import {DashboardComponent} from './';

const routes:Routes = [
    {
        path:'dashboard', component:DashboardComponent
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class DashboardRoutingModule {}

//dashboard.module.ts

import { NgModule }  from core
import { CommonModule }
import { DashboardRoutingModule }
import { DashboardComponent }

@NgModule({
    declarations:[
        DashboardComponent
    ],
    imports:[
        ComonModule
        DashBoardRoutingModule
    ]

})

export class DashboardModule

//app.routing.module.ts

import { RouterModule, Routes} from angular/router;

const routes:Routes = [
    {
        path:'dashboard', loadChildren: ()=> import(./dashboard/dashboard.module.ts).then(m => m.Dashboardodule)
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)]
    exports:[RouterModule]
})

export class AppRoutingModule {}



*/