import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly inactivityDuration = 300000;
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
        return setTimeout(() => {
            this.inactivitySubject.next();
        }, this.inactivityDuration);
    }
}
