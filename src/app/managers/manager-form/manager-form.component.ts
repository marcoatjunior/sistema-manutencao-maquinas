import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { untilDestroyed } from "ngx-take-until-destroy";
import { ManagerService } from "@managers/shared/manager.service";
import { Manager } from "@managers/shared/manager.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { openModalDialog } from "@shared/components/modal-dialog";
import { modalSuccess, modalError } from "@shared/models";

@Component({
  selector: "app-manager-form",
  templateUrl: "manager-form.component.html",
})
export class ManagerFormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  managerId: number;

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private managerService: ManagerService,
    private modalService: NgbModal
  ) {
    this.managerId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      email: ["", Validators.required],
      telephone: ["", Validators.required],
      additional: [""],
    });

    this.populateForm();
  }

  private populateForm() {
    if (this.managerId) {
      this.managerService
        .getById(this.managerId)
        .pipe(untilDestroyed(this))
        .subscribe((manager: Manager) =>
          this.formGroup.patchValue({ ...manager })
        );
    }
  }

  submit() {
    if (this.formGroup.valid) {
      this.loading = true;
      this.managerService
        .save({ ...this.formGroup.value, profile_id: 3 })
        .pipe(untilDestroyed(this))
        .subscribe(
          () =>
            openModalDialog(this.modalService, {
              ...modalSuccess,
              route: "responsaveis",
            }),
          () =>
            openModalDialog(this.modalService, {
              ...modalError,
              route: "responsaveis",
            })
        );
    } else {
      Object.values(this.formGroup.controls).forEach((control: FormControl) =>
        control.markAsDirty()
      );
    }
  }

  goBack(): void {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.loading = false;
  }
}
