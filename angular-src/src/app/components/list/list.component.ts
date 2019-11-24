import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private authService: AuthService) { }
  users: any;
  ngOnInit() {
    this.authService.getList().subscribe(users => {
      this.users = users;
    });
  }
}
