import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  // This will Hide the Component i.e not visible Untill Condition Satisfied
  @Input() visible = false;

  // The Message to Show the User
  @Input() notFoundMessage = "";

  // This will Reset the Component
  @Input() resetLinkText = "Reset";

  // After reset Re-direct to home Page
  @Input() resetLinkRoute = "/";

  constructor() { }

  ngOnInit(): void {
  }

}
