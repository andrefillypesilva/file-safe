import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

/**
 * MOCKS
 */
import localStorageMock from './shared/mocks/local-storage.mock';
import authServiceMock from './shared/mocks/auth-service.mock';
import jsonMock from './shared/mocks/json.mock';

/**
 * SERVICES
 */
import { AuthService } from './shared/services/auth.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{
        provide: AuthService, useValue: authServiceMock(),
      }],
    }).compileComponents();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock(),
    });

    Object.defineProperties(JSON, jsonMock());
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'File Safe' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('File Safe');
  });
});
