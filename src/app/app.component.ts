import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/**
 * CUSTOM COMPONENTS
 */
import { LoginComponent } from './core/login/login.component';
import { FileUploaderComponent } from './core/file-uploader/file-uploader.component';
import { FileListComponent } from './core/file-list/file-list.component';

/**
 * SERVICES
 */
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginComponent, FileUploaderComponent, FileListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly authService = inject(AuthService);

  public readonly isLoggedIn$ = this.authService.isLoggedIn$;

  title = 'File Safe';
}
