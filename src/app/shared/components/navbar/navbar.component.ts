import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@shared/services";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  @Input() isLogged: Boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLogged = this.authService.currentUserValue !== null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
