import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';//import {SidebarModule} from 'primeng/sidebar';
import { AppComponent } from './app.component';
import { SidebarModule } from 'ng-sidebar';
import { MenuComponent } from './menu/menu.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { StackChartComponent } from './stack-chart/stack-chart.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule,Routes } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import 'hammerjs';


const appRoutes: Routes=[
  { path: '', component: AppComponent },
  { path:'bar' , component : BarChartComponent},
  { path:'pie' , component : PieChartComponent},
  { path:'stack' , component : StackChartComponent},
  { path:'back' , component : AppComponent},
   


]


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PieChartComponent,
    BarChartComponent,
    StackChartComponent,

  ],
  imports: [
      BrowserModule, SidebarModule.forRoot(), ChartsModule, BrowserAnimationsModule,RouterModule.forRoot(appRoutes),NoopAnimationsModule,MDBBootstrapModule.forRoot()
 ],
    schemas: [ NO_ERRORS_SCHEMA ],

  bootstrap: [AppComponent]
})
export class AppModule { }
