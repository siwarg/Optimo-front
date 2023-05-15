import { Component, Inject, OnInit } from '@angular/core';
import { AccountInfo, AuthenticationResult, RedirectRequest } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

constructor(
@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
private authService: MsalService,
private router: Router
) { }

ngOnInit() {
const accounts: AccountInfo[] = this.authService.instance.getAllAccounts();
if (accounts && accounts.length > 0) {
// Rediriger l'utilisateur vers la page dashboard s'il est déjà connecté
this.router.navigate(['/dashboard']);
} else {
// Utiliser le SSO pour connecter automatiquement l'utilisateur s'il a déjà une session ouverte
this.authService.ssoSilent({...this.msalGuardConfig.authRequest} as RedirectRequest)
.toPromise()
.then(() => {
// Rediriger l'utilisateur vers la page dashboard après avoir obtenu un jeton d'accès valide
this.router.navigate(['/dashboard']);
})
.catch(() => {
// S'il n'y a pas de session ouverte, rediriger l'utilisateur vers la page de connexion
this.router.navigate(['']);
});
}
}
}

