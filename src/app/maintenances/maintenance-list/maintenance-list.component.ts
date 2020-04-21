import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Maintenance } from "@maintenances/shared/maintenance.model";

@Component({
  selector: "app-maintenance-list",
  templateUrl: "./maintenance-list.component.html",
})
export class MaintenanceListComponent implements OnInit, OnDestroy {
  @Input() maintenances: Maintenance[];

  ngOnInit() {}

  ngOnDestroy() {}
}
