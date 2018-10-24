import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from './../classes/alert';
import { AlertService } from './alert.service';
import { AlertType } from './../enums/alert-type.enum';
import { Observable } from 'rxjs';
import { User } from './../classes/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User | null;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
    ) { 
      //TODO fetch the user from Firebase backend
      this.currentUser = this.afAuth.authState.pipe(
        switchMap((user) => {
          if(user) {
            return this.db.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );

      this.setCurrentUserSnapshot();
      
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user) =>{
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const updatedUser = {
          id: user.user.uid,
          email: user.user.email,
          firstName,
          lastName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chatroom-1203a.appspot.com/o/default_profile.jpeg?alt=media&token=a8b7e171-a174-44fe-b791-bfac301f0e73'
        }
        userRef.set(updatedUser);
        return true;
      })
      .catch((err) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => true)
      .catch((err) => false)
    );
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out.'));
    });
  }

  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot = user);
  }
}
