import { Component, OnInit, OnDestroy, Input, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { MachineService } from "@machines/shared/machine.service";
import { Observable } from "rxjs";
import { Machine } from "@machines/shared/machine.model";
import { ActionEnum } from "@shared/enums/action.enum";
import { enumSelector } from "@shared/enums/action.enum";
import { MachineLogFilter } from "@machines/shared/models/machine-log-filter.model";

@Component({
  selector: "app-machine-log-filter",
  templateUrl: "./machine-log-filter.component.html",
  styleUrls: ["./machine-log-filter.component.scss"],
})
export class MachineLogFilterComponent implements OnInit, OnDestroy {
  @Input() formSubmit: EventEmitter<MachineLogFilter>;

  machines$: Observable<Machine[]>;
  formGroup: FormGroup;

  actions = enumSelector(ActionEnum);

  constructor(
    private formBuilder: FormBuilder,
    private machineService: MachineService
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      machine_id: [null],
      action_id: [null],
    });
    this.machines$ = this.machineService.get();
  }

  filter() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value as MachineLogFilter);
    } else {
      Object.values(this.formGroup.controls).forEach((control: FormControl) =>
        control.markAsDirty()
      );
    }
  }

  ngOnDestroy() {}
}
