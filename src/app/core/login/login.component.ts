import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

/**
 * CUSTOM SERVICES
 */
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  public isLoggedIn$ = this.authService.isLoggedIn$;

  public ngOnInit(): void {
    this.userService.inactivity$.subscribe(() => this.authService.logout());
  }

  public login(): void { this.authService.login(); }
  public logout(): void { this.authService.logout(); }
}
