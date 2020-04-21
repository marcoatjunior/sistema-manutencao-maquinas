import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Log } from "@logs/shared/log.model";

@Component({
  selector: "app-log-list",
  templateUrl: "./log-list.component.html",
})
export class LogListComponent implements OnInit, OnDestroy {
  @Input() logs$: Observable<Log[]>;

  ngOnInit() {}

  ngOnDestroy() {}
}
