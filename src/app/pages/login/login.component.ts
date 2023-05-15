import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest} from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AzureAdService } from 'src/app/services/azure-ad.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  currentYear: number = new Date().getFullYear();
  user !: User;
  isUserLoggedIn: boolean = false;
  private readonly _destroy = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
  private msalBroadCastService: MsalBroadcastService,
  private authService: MsalService,
  private router: Router,
  private azureAdService: AzureAdService) { 

  }

  ngOnInit(): void {
    this.user = new User();
    this.msalBroadCastService.inProgress$.pipe
    ( filter ((interactionStatus: InteractionStatus)=>
    interactionStatus == InteractionStatus.None),
    takeUntil(this._destroy))
    .subscribe(x=>
      {
        this.isUserLoggedIn=this.authService.instance.getAllAccounts().length > 0
        this.azureAdService.isUserLoggedIn.next(this.isUserLoggedIn);
        if (this.isUserLoggedIn) {
          this.router.navigate(['/dashboard']);
        }else {
          // Utiliser le SSO pour connecter automatiquement l'utilisateur s'il a déjà une session ouverte
          this.authService.ssoSilent({...this.msalGuardConfig.authRequest} as RedirectRequest)
        }
      })
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login(){
    if(this.msalGuardConfig.authRequest)
    {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    }
    else
    {
      this.authService.loginRedirect();
    
    }
  }
}
