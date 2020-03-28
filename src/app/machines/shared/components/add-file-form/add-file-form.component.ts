import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { File } from '@machines/shared/file.model';
import { MachineService } from '@machines/shared/machine.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router, ActivatedRoute } from '@angular/router';
import { Machine } from '@machines/shared/machine.model';

@Component({
    selector: 'app-add-file-form',
    templateUrl: './add-file-form.component.html'
})
export class AddFileFormComponent implements OnInit, OnDestroy {

    @Input() machine: Machine;
    @Input() modal: NgbModal;

    loading = false;
    fileInput: File;
    formGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private machineService: MachineService
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            description: ['', Validators.required],
            file: ['', Validators.required]
        });
    }

    handleFileInput(files: FileList) {
        this.fileInput = files[0];
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.machine.files.push({ ...this.fileInput as File, description: this.formGroup.get('description').value } as File);
            this.machineService.save(this.machine)
                .pipe(untilDestroyed(this))
                .subscribe(() => this.updatePage(), () => { this.loading = false });
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    updatePage(): void {
        this.router.navigate(['/'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}