import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { File } from "@shared/models/file.model";
import { MachineService } from "@machines/shared/machine.service";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Machine } from "@machines/shared/machine.model";
import { FileService } from "@shared/services/file-upload.service";
import { openModalDialog } from "@shared/components/modal-dialog";
import { modalSuccess, modalError } from "@shared/models";

@Component({
  selector: "app-add-file-form",
  templateUrl: "./add-file-form.component.html",
})
export class AddFileFormComponent implements OnInit, OnDestroy {
  @Input() machine: Machine;
  @Input() modal: NgbActiveModal;

  including = false;
  sending = false;
  fileInput: File;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private machineService: MachineService,
    private fileService: FileService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: ["", Validators.required],
      file: ["", Validators.required],
    });
  }

  handleFileInput(files: FileList) {
    this.sending = true;
    this.fileService
      .post(files[0])
      .pipe(untilDestroyed(this))
      .subscribe(
        (file: File) => this.fileUploaded(file),
        () => this.setFileUploadError()
      );
  }

  private fileUploaded(file: File) {
    this.fileInput = file;
    this.sending = false;
  }

  private setFileUploadError() {
    this.formGroup.get("file").setErrors({ upload: true });
    this.sending = false;
  }

  submit() {
    if (this.formGroup.valid) {
      this.including = true;
      this.addFile();
      this.machineService
        .save(this.machine)
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

  private addFile() {
    this.fileInput.description = this.formGroup.get("description").value;
    this.machine.files = [this.fileInput];
  }

  ngOnDestroy() {
    this.including = false;
  }
}
