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
  user!: User;

  // Inject UserService To get the User Details
  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    // Get and Store the Details
    this.userService.userObservable.subscribe( (newUser) => {
      this.user = newUser;
    })
  }

}
