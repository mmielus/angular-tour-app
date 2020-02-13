import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  error: string;
  hide = true;
  modelForm: FormGroup;
  showSpinner = false;

  private authService: AuthService;
  private router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit() {
    this.modelForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  isEmailInvalid() {
    return this.modelForm.controls['email'].invalid;
  }

  isPasswordInvalid() {
    return this.modelForm.controls['password'].invalid;
  }

  getPasswordErrorMessage() {
    return this.modelForm.controls['password'].hasError('required') ? 'Hasło jest wymagane' :
      '';
  }

  getEmailErrorMessage() {
    return this.modelForm.controls['email'].hasError('required') ? 'Email jest wymagany' :
      this.modelForm.controls['email'].hasError('email') ? 'Email jest niepoprawny' :
        '';
  }

  onSubmit() {
    this.error = null;
    if (!this.modelForm.valid) {
      this.error = 'Wprowadzone dane są niepoprawne';
      return;
    }

    this.showSpinner = true;
    this.authService.login(this.modelForm.value)
      .then(val => {
        this.showSpinner = false;
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.showSpinner = false;
        this.error = 'Błędne dane logowania';
      });
  }
}
