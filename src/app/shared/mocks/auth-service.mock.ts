import { of } from "rxjs";

export default function authServiceMock() {
    const authServiceMock = jasmine.createSpyObj(['isLoggedIn$', 'login', 'logout']);
    authServiceMock.isLoggedIn$ = of(false);
    authServiceMock.login.and.callThrough();
    authServiceMock.logout.and.callThrough();

    return authServiceMock;
}
