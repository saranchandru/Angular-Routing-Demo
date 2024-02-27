import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }
  onLogout() {
    this.loginService.currentUser.next({ ...this.loginService.defaultValue });
    this.router.navigateByUrl('/login');
  }
}
