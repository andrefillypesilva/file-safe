import { TestBed } from "@angular/core/testing";

/**
 * SERVICE
 */
import { AuthService } from "./auth.service";

/**
 * MOCKS
 */
import localStorageMock from "../mocks/local-storage.mock";
import jsonMock from "../mocks/json.mock";

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        authService = TestBed.inject(AuthService);

        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock(),
        });
      
        Object.defineProperties(JSON, jsonMock());
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    describe('--- PROPERTIES ---', () => {
        describe('when [isLoggedIn] property is true on localStorage', () => {
            beforeEach(() => {
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                authService = new AuthService();
            });
    
            it('should check isLoggedIn property in localStorage', (done: DoneFn) => {
                authService.isLoggedIn$.subscribe((loggedInStatus: boolean) => {
                    expect(loggedInStatus).toBeTrue();
                    done();
                });
            });
        });

        describe('when [isLoggedIn] property is false on localStorage', () => {
            beforeEach(() => {
                localStorage.setItem('isLoggedIn', JSON.stringify(false));
                authService = new AuthService();
            });
    
            it('should check isLoggedIn property in localStorage', (done: DoneFn) => {
                authService.isLoggedIn$.subscribe((loggedInStatus: boolean) => {
                    expect(loggedInStatus).toBeFalse();
                    done();
                });
            });
        });
    });

    describe('--- METHODS ---', () => {
        describe('when calling login', () => {
            beforeEach(() => {
                localStorage.setItem('isLoggedIn', JSON.stringify(false));
                authService = new AuthService();
            });

            it('should isLoggedIn property be true', (done: DoneFn) => {
                authService.login();

                authService.isLoggedIn$.subscribe((loggedInStatus: boolean) => {
                    expect(loggedInStatus).toBeTrue();
                    done();
                });
            });
        });

        describe('when calling logout', () => {
            beforeEach(() => {
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                authService = new AuthService();
            });

            it('should isLoggedIn property be false', (done: DoneFn) => {
                authService.logout();

                authService.isLoggedIn$.subscribe((loggedInStatus: boolean) => {
                    expect(loggedInStatus).toBeFalse();
                    done();
                });
            });
        });
    });
});
