import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from './../classes/alert';
import { AlertService } from './alert.service';
import { AlertType } from './../enums/alert-type.enum';
import { Observable } from 'rxjs';
import { User } from './../classes/user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService
    ) { 
      //TODO fetch the user from Firebase backend
      this.currentUser = of(null);
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    //TODO Firebase
    return of(true);
  }

  public login(email: string, password: string): Observable<boolean> {
    //TODO Firebase
    return of(true);
  }

  public logout(): void {
    //TODO Firebase
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out.'));
  }
}
