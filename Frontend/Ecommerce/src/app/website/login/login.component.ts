import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { User } from './login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  user: User = new User();
  constructor(private router: Router) { }
  login() {
    if (this.user.username === 'admin' && this.user.password === 'admin') {
      this.router.navigate(['/admin']);
    }
    else if (this.user.username === 'user' && this.user.password === 'user') {
      this.router.navigate(['/user']);
    }
    else {
      alert('Login failed');
    }
  }
}