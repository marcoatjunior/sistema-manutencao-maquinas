import { Component, OnInit } from "@angular/core";

import { AuthService } from "./shared/services";
import { User } from "./shared/models";

@Component({
  selector: "app",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
}
