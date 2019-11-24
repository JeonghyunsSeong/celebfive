import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  userString: string;
  name: string;
  token: string;

  constructor() { }

  ngOnInit() {
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString);
    this.name = this.user.name;
    this.token = localStorage.getItem('id_token');
  }
}
