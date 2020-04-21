import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Observable } from "rxjs";
import { Machine } from "@machines/shared/machine.model";
import { MaintenanceFilter } from "@maintenances/shared/maintenance-filter.model";
import { reviewTypes } from "@shared/constants";
import { ManagerService } from "@managers/shared/manager.service";
import { untilDestroyed } from "ngx-take-until-destroy";

@Component({
  selector: "app-maintenance-filter",
  templateUrl: "./maintenance-filter.component.html",
})
export class MaintenanceFilterComponent implements OnInit, OnDestroy {
  @Input() formSubmit: EventEmitter<MaintenanceFilter>;

  managers$: Observable<Machine[]>;
  formGroup: FormGroup;

  reviewTypes = reviewTypes;

  constructor(
    private formBuilder: FormBuilder,
    private managerService: ManagerService
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      start_date: [null],
      end_date: [null],
      review_type_id: [null],
      technical_manager_id: [null],
    });
    this.managers$ = this.managerService.get();

    this.startDateChanges();
    this.endDateChanges();
  }

  private startDateChanges() {
    this.formGroup
      .get("start_date")
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.setEndDateValidation(value);
      });
  }

  private setEndDateValidation(value: any) {
    const endDate = this.formGroup.get("end_date");
    if (!value || endDate.value) {
      endDate.setValidators(null);
      endDate.setErrors(null);
    } else {
      endDate.setValidators(Validators.required);
      endDate.setErrors({ optional: false });
    }
  }

  private endDateChanges() {
    this.formGroup
      .get("end_date")
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.setStartDateValidation(value);
      });
  }

  private setStartDateValidation(value: any) {
    const startDate = this.formGroup.get("start_date");
    if (!value || startDate.value) {
      startDate.setValidators(null);
      startDate.setErrors(null);
    } else {
      startDate.setValidators(Validators.required);
      startDate.setErrors({ optional: false });
    }
  }

  filter() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value as MaintenanceFilter);
    } else {
      Object.values(this.formGroup.controls).forEach((control: FormControl) =>
        control.markAsDirty()
      );
    }
  }

  ngOnDestroy() {}
}
