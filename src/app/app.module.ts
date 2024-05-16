import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule } from './layouts';
import {
  AppFooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './components';

import { AuthService, ScreenService, AppInfoService } from './services';
import { UnauthenticatedContentModule } from './layouts/unauthenticated-content/unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { CrmContactListModule } from './pages/crm-contact-list/crm-contact-list.component'; 
import { ThemeService } from './services';
import { AppSignInModule } from "./pages/sign-in-form/sign-in-form.component";

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [AuthService, ScreenService, AppInfoService, ThemeService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        SideNavOuterToolbarModule,
        SingleCardModule,
        AppFooterModule,
        ResetPasswordFormModule,
        CreateAccountFormModule,
        ChangePasswordFormModule,
        LoginFormModule,
        UnauthenticatedContentModule,
        CrmContactListModule, 
        AppRoutingModule,
        AppSignInModule,
        HttpClientModule
    ]
})
export class AppModule { }
