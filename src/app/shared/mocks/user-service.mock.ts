import { EMPTY, of } from "rxjs";

export default function userServiceMock() {
    const userServiceMock = jasmine.createSpyObj(['refreshUI', 'inactivity$', 'refreshUI$']);
    userServiceMock.inactivity$ = of(EMPTY);
    userServiceMock.refreshUI$ = of(EMPTY);
    userServiceMock.refreshUI = jasmine.createSpy();
    
    return userServiceMock;
}
