import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  user !: User;
  constructor() { }

  ngOnInit(): void {
    this.user = new User();
  }


}
