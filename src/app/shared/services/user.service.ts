import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly inactivityDuration = 5000;
    private inactivityTimer = this.createInactivityTimer();
    private readonly inactivitySubject = new Subject<void>();
    public readonly inactivity$ = this.inactivitySubject.asObservable();

    constructor() {
        window.addEventListener('click', this.resetActivityStatus.bind(this));
    }

    private resetActivityStatus(): void {
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = this.createInactivityTimer();
    }

    private createInactivityTimer(): any {
        console.log('1');
        return setTimeout(() => {
            console.log('2');
            this.inactivitySubject.next();
        }, this.inactivityDuration);
    }
}
