import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  

  menuState:string = 'out';
  constructor(private router: Router) { }
 bar()
  {
    this.router.navigate(['/bar']);
  }
  pie()
  {
    this.router.navigate(['/pie'])
  }
  stack()
  {
    this.router.navigate(['/stack'])
  }
  
}
