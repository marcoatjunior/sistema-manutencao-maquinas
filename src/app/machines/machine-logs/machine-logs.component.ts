import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
} from "@angular/core";
import { Observable } from "rxjs";
import { MachineService } from "@machines/shared/machine.service";
import { MachineLog } from "@machines/shared/models/machine-log.model";
import { MachineLogFilter } from "@machines/shared/models/machine-log-filter.model";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-machine-logs",
  templateUrl: "./machine-logs.component.html",
})
export class MachineLogsComponent implements OnInit, OnDestroy {
  formSubmit = new EventEmitter<MachineLogFilter>();
  logs$: Observable<MachineLog[]>;

  constructor(private machineService: MachineService) {}

  ngOnInit() {
    this.logs$ = this.formSubmit.pipe(
      switchMap((filter) => this.machineService.getLog(filter))
    );
  }

  ngOnDestroy() {}
}
