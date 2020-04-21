import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { LogService } from "@logs/shared/log.service";
import { Log } from "@logs/shared/log.model";

@Component({
  selector: "app-log",
  templateUrl: "log.component.html",
})
export class LogComponent implements OnInit, OnDestroy {
  log$: Observable<Log>;
  logId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {
    this.logId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.log$ = this.logService.getById(this.logId);
  }

  goBack(): void {
    this.router.navigate(["../../"], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
