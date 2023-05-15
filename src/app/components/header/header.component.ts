import { Component, Inject, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AzureAdService } from 'src/app/services/azure-ad.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
  private msalBroadCastService: MsalBroadcastService,
  private authService: MsalService,
  private router: Router,
  private azureAd: AzureAdService) { 

  }


  ngOnInit(): void {
    this.azureAd.isUserLoggedIn.subscribe(
      x=>{
        this.isUserLoggedIn=x;
      }
    )
  }

  logout()
  {
      this.authService.logoutRedirect({postLogoutRedirectUri: environment.postLogoutUrl});
  }

}
