import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { User } from './utilities/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
