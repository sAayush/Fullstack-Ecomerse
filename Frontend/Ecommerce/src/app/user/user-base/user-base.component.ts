import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserhomeComponent } from '../userhome/userhome.component';

@Component({
  selector: 'app-user-base',
  standalone: true,
  imports: [RouterOutlet, CommonModule, UserhomeComponent, RouterLink, RouterLinkActive],
  templateUrl: './user-base.component.html',
  styleUrl: './user-base.component.css'
})
export class UserBaseComponent {

  constructor(private router: Router) { }

  isActive(): boolean {
    const currentUrl = this.router.url;
    
    if (currentUrl === '/user') {
      return false; 
    }
    return true;
  }
  isClassActive(className: string): boolean {
    const element = document.querySelector(`.${className}`);
    return !!element;
  }
}
