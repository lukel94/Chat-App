import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType } from '../../enums/alert-type.enum';
import { Alert } from '../../classes/alert';
import { AlertService } from './../../services/alert.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder, 
    private alertService: AlertService,
    private auth: AuthService,
    private loadingService: LoadingService,
    private router: Router
    ) {
    this.createForm();
   }

  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void { 
    this.loadingService.isLoading.next(true);
    if(this.signupForm.valid) {
      const {firstName, lastName, email, password} = this.signupForm.value;
      //TODO
      this.subscriptions.push(
        this.auth.signup(firstName, lastName, email, password).subscribe(success =>{
          if(success) {
            this.router.navigate(['/chat'])
          } else {
            const failedSignUpAlert = new Alert('There is a problem signing up, try again later.', AlertType.Danger);
            this.alertService.alerts.next(failedSignUpAlert);
          }
          this.loadingService.isLoading.next(false);
        })
      );

    }
    else {
      const failedSignUpAlert = new Alert('Please enter a valid name or email, and try again.', AlertType.Danger);
      this.alertService.alerts.next(failedSignUpAlert);
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
