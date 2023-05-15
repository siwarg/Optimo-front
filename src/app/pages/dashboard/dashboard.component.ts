import { Component, OnInit } from '@angular/core';
import { AzureAdService } from 'src/app/services/azure-ad.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  isUserLoggedIn: boolean = false;

  constructor(private azureAd: AzureAdService) { }

  ngOnInit(): void {
  
  }
}
