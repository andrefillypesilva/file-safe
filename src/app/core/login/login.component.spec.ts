import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

/**
 * MOCKS
 */
import localStorageMock from '../../shared/mocks/local-storage.mock';
import jsonMock from '../../shared/mocks/json.mock';
import authServiceMock from '../../shared/mocks/auth-service.mock';

/**
 * SERVICES
 */
import { AuthService } from '../../shared/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService = authServiceMock();

  beforeEach(async () => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock(),
    });

    Object.defineProperties(JSON, jsonMock());

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{
        provide: AuthService, useValue: authService,
      }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('--- METHODS ---', () => {
    it('should call [login] auth action', () => {
      component.login();
      expect(authService.login).toHaveBeenCalled();
    });

    it('should call [logout] auth action', () => {
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
