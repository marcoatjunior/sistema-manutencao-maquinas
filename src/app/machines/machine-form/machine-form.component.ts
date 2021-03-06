import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Machine } from "@machines/shared/machine.model";
import { MachineService } from "@machines/shared/machine.service";
import { ManagerService } from "@managers/shared/manager.service";
import { Observable } from "rxjs";
import { Manager } from "@managers/shared/manager.model";
import { FileService } from "@shared/services/file.service";
import { openModalDialog } from "@shared/components/modal-dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { modalSuccess, modalError, File } from "@shared/models";
import { Piece } from "@pieces/shared/piece.model";
import { MachinePiece } from "@machines/shared/models/machine-piece.model";
import { MachineManager } from "@machines/shared/models/machine-manager.model";

@Component({
  selector: "app-machine-form",
  templateUrl: "machine-form.component.html",
})
export class MachineFormComponent implements OnInit, OnDestroy {
  managers$: Observable<Manager[]>;
  formGroup: FormGroup;
  machineId: number;
  machine: Machine;
  selected: Piece | Manager | File;

  downloadError = "";
  loading = false;
  excluding = false;
  unlinking = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private machineService: MachineService,
    private managerService: ManagerService,
    private fileService: FileService,
    private modalService: NgbModal
  ) {
    this.machineId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      description: ["", Validators.required],
      technical: ["", Validators.required],
      patrimony: ["", Validators.required],
      review_period: ["", Validators.required],
      warning_period: ["", Validators.required],
      user_id: [null],
    });
    this.managers$ = this.managerService.get();
    this.populateForm();
  }

  private populateForm() {
    if (this.machineId) {
      this.machineService
        .getById(this.machineId)
        .pipe(untilDestroyed(this))
        .subscribe((machine: Machine) => {
          this.machine = machine;
          this.formGroup.patchValue({ ...machine });
        });
    }
  }

  downloadFile(file: File) {
    this.fileService
      .download(file.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: Blob) =>
          saveAs(response, `${file.description}.${file.type}`),
        (error) => (this.downloadError = error)
      );
  }

  submit() {
    if (this.formGroup.valid) {
      this.loading = true;
      this.machineService
        .save(this.formGroup.value as Machine)
        .pipe(untilDestroyed(this))
        .subscribe(
          (machine: Machine) =>
            this.machineService
              .addManager({
                machine_id: machine.id,
                user_id: this.formGroup.get("user_id").value,
              })
              .subscribe(
                () =>
                  openModalDialog(this.modalService, {
                    ...modalSuccess,
                    route: "maquinas",
                  }),
                () =>
                  openModalDialog(this.modalService, {
                    ...modalError,
                    route: "maquinas",
                  })
              ),
          () => {
            openModalDialog(this.modalService, {
              ...modalError,
              route: "",
            });
            this.loading = false;
          }
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

  openModal(content, data) {
    this.selected = data;
    this.modalService.open(content, { size: "md" });
  }

  unlinkMachinePiece() {
    this.unlinking = true;
    this.machineService
      .unlinkPiece({
        machine_id: this.machineId,
        piece_id: this.selected.id,
      } as MachinePiece)
      .pipe(untilDestroyed(this))
      .subscribe(
        () =>
          openModalDialog(this.modalService, {
            ...modalSuccess,
            route: "maquinas",
          }),
        () =>
          openModalDialog(this.modalService, {
            ...modalError,
            route: "maquinas",
          })
      );
  }

  unlinkMachineManager() {
    this.unlinking = true;
    this.machineService
      .unlinkManager({
        machine_id: this.machineId,
        user_id: this.selected.id,
      } as MachineManager)
      .pipe(untilDestroyed(this))
      .subscribe(
        () =>
          openModalDialog(this.modalService, {
            ...modalSuccess,
            route: "maquinas",
          }),
        () =>
          openModalDialog(this.modalService, {
            ...modalError,
            route: "maquinas",
          })
      );
  }

  deleteMachineFile() {
    this.excluding = true;
    this.fileService
      .delete(this.selected.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () =>
          openModalDialog(this.modalService, {
            ...modalSuccess,
            route: "maquinas",
          }),
        () =>
          openModalDialog(this.modalService, {
            ...modalError,
            route: "maquinas",
          })
      );
  }

  ngOnDestroy() {
    this.loading = false;
  }
}
