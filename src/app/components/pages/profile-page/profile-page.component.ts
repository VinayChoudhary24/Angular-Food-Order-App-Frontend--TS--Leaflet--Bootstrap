import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  // Store the User Details
  userName: string = '';
  userEmail: string = '';
  userAddress: string = '';

  // Inject UserService To get the User Details
  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    if(localStorage.getItem('User')) {
      let userData = localStorage.getItem('User');
      let userStoredData = userData && JSON.parse(userData);
      this.userName = userStoredData.name;
      this.userEmail = userStoredData.email;
      this.userAddress = userStoredData.address;
    }
  }
}
