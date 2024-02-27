import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './includes/nav-bar/nav-bar.component';
import { LoginService } from './login/login.service';
import { User } from './utilities/user/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUser.subscribe({
      next: (userInfo: User) => {
        this.isLoggedIn = userInfo.id > 0;
      }
    })
  }
}
