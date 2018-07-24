import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

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