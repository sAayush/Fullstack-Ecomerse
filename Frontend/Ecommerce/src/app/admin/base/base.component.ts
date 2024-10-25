import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, HomeComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  constructor(private router: Router) { }

  isActive(): boolean {
    // Get the current route's path
    const currentUrl = this.router.url;
    
    // Check if the current route is exactly '/admin' with no child route
    if (currentUrl === '/admin') {
      return false;  // This will show the <app-home> component
    }

    // Otherwise, for any other route, show the <router-outlet>
    return true;
  }
  isClassActive(className: string): boolean {
    const element = document.querySelector(`.${className}`);
    return !!element;
  }
  
}
