import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { AzureAdService } from './services/azure-ad.service';

const isIE=window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    WorkOrderComponent,
    AssignmentComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        CommonModule,
        LayoutModule,
        NgbModule,
        MsalModule.forRoot( new PublicClientApplication
          (
            {
            auth:{
              clientId:'422c1733-7126-4f0f-8316-a2e164b731d2',
              redirectUri:'http://localhost:4200/dashboard',
              authority: 'https://login.microsoftonline.com/e3f5f93c-b43c-483d-8e0f-5a1d9fcb76e7',
              navigateToLoginRequestUrl: true,
              knownAuthorities: ['login.microsoftonline.com']
            },
            cache:
            {
              cacheLocation: 'localStorage',
              storeAuthStateInCookie: isIE
            }
          }
          ),
          {
            interactionType:InteractionType.Redirect,
            authRequest:{
              scopes:['user.Read']
            }
          },
          {
            interactionType:InteractionType.Redirect,
            protectedResourceMap: new Map(
              [
                ['https://graph.microsoft.com/v1.0/me',['user.Read']]
              ]
            )
          }
          )
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi:true
  }, MsalGuard, AzureAdService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
