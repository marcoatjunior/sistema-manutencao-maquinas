import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { File } from '@machines/shared/file.model';
import { MachineService } from '@machines/shared/machine.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router, ActivatedRoute } from '@angular/router';
import { Machine } from '@machines/shared/machine.model';
import { FileUploadService } from '@shared/services/file-upload.service';

@Component({
    selector: 'app-add-file-form',
    templateUrl: './add-file-form.component.html'
})
export class AddFileFormComponent implements OnInit, OnDestroy {

    @Input() machine: Machine;
    @Input() modal: NgbActiveModal;

    loading = false;
    fileInput: File;
    formGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private machineService: MachineService,
        private fileUploadService: FileUploadService
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            description: ['', Validators.required],
            file: ['', Validators.required]
        });
    }

    handleFileInput(files: FileList) {
        this.loading = true;
        this.fileUploadService.post(files[0])
            .pipe(untilDestroyed(this))
            .subscribe((file: File) => this.fileUploaded(file), () => this.setFileUploadError());
    }

    private fileUploaded(file: File) {
        this.fileInput = file;
        this.loading = false
    }

    private setFileUploadError() {
        this.formGroup.get('file').setErrors({ upload: false });
        this.loading = false;
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.addFile();
            this.machineService.save(this.machine)
                .pipe(untilDestroyed(this))
                .subscribe(() => this.updatePage(), () => { this.loading = false });
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    private addFile() {
        this.fileInput.description = this.formGroup.get('description').value;
        this.machine.files= [this.fileInput];
    }

    updatePage(): void {
        this.router.navigate(['/'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}