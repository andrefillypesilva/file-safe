import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoggedInStatus());
  public readonly isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  private getInitialLoggedInStatus(): boolean {
    return !!JSON.parse(localStorage.getItem('isLoggedIn') ?? 'false');
  }

  private storeLoggedInStatus(loggedInStatus: boolean): void {
    localStorage.setItem('isLoggedIn', JSON.stringify(loggedInStatus));
  }

  public login(): void {
    this.isLoggedInSubject.next(true);
    this.storeLoggedInStatus(true);
  }
  
  public logout(): void {
    this.isLoggedInSubject.next(false);
    this.storeLoggedInStatus(false);
  }
}
