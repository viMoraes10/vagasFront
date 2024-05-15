import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { LoginOauthModule } from 'src/app/components/library/login-oauth/login-oauth.component';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService, IResponse } from 'src/app/services';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
})




export class CreateAccountFormComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  form: FormGroup;
  loading = false; // controle para o indicador de carga
 
  async ngOnInit(): Promise<void>  {
    this.defaultAuthData = await this.authService.getUser();

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, {
      validator: this.confirmPasswordValidator('password', 'confirmedPassword')
    });
  }

  confirmPasswordValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ confirmPasswordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
  confirmPassword = (e: ValidationCallbackData) => e.value === this.formData.password;

  @Input() redirectLink = '/auth/login';
  @Input() buttonLink = '/auth/login'; 

  defaultAuthData: IResponse;

  formData: any = {};
 
  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password, username, role} = this.formData;
    this.loading = true;

    var newUser = {
      email: email,
      username: username,
      password: password,
      role: role
    }
    const result = await this.authService.createAccount(newUser);
    
    
    this.loading = false;

    if (result.isOk) {
      this.router.navigate([this.buttonLink]);
    } else {
      notify(result.message, 'error', 2000);
    }
  }
 
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginOauthModule,
    DxFormModule,
    DxLoadIndicatorModule,
  ],
  declarations: [CreateAccountFormComponent],
  exports: [CreateAccountFormComponent],
})
export class CreateAccountFormModule { }
