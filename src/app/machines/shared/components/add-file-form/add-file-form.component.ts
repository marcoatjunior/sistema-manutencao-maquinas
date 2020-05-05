import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Machine } from "@machines/shared/machine.model";
import { openModalDialog } from "@shared/components/modal-dialog";
import { modalSuccess, modalError } from "@shared/models";
import { MachineFile } from "@machines/shared/models/machine-file.model";
import { FileService } from "@shared/services";

@Component({
  selector: "app-add-file-form",
  templateUrl: "./add-file-form.component.html",
})
export class AddFileFormComponent implements OnInit, OnDestroy {
  @Input() machine: Machine;
  @Input() modal: NgbActiveModal;

  including = false;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      machine_id: [this.machine.id],
      description: ["", Validators.required],
      file: ["", Validators.required],
      archive: ["", Validators.required],
    });
  }

  handleFileInput(files: FileList) {
    this.formGroup.get("archive").setValue(files[0]);
  }

  submit() {
    if (this.formGroup.valid) {
      this.including = true;
      this.fileService
        .upload({ ...this.formGroup.value } as MachineFile)
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
    } else {
      Object.values(this.formGroup.controls).forEach((control: FormControl) =>
        control.markAsDirty()
      );
    }
  }

  ngOnDestroy() {
    this.including = false;
  }
}
