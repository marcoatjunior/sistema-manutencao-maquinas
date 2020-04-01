import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Machine } from '@machines/shared/machine.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Piece } from 'src/app/pieces/shared/piece.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PieceService } from 'src/app/pieces/shared/piece.service';
import { MaintenanceService } from 'src/app/maintenances/shared/maintenance.service';
import { Maintenance } from '@maintenances/shared/maintenance.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { reviewTypes } from '@shared/constants';
import * as moment from 'moment';
import { openModalDialog } from '@shared/components/modal-dialog';
import { modalSuccess, modalError } from '@shared/models';

@Component({
    selector: 'app-add-maintenance-form',
    templateUrl: './add-maintenance-form.component.html'
})
export class AddMaintenanceFormComponent implements OnInit, OnDestroy {

    @Input() machine: Machine;
    @Input() modal: NgbActiveModal;

    pieces$: Observable<Piece[]>;
    including = false;
    formGroup: FormGroup;

    reviewTypes = reviewTypes;

    constructor(
        private formBuilder: FormBuilder,
        private pieceService: PieceService,
        private maintenanceService: MaintenanceService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            description: ['', Validators.required],
            review_type: [null, Validators.required],
            machine: [this.machine, Validators.required],
            piece: [null, Validators.required],
            amount_used: ['', Validators.required],
            review_at: ['', Validators.required]
        });

        this.pieces$ = this.pieceService.get();
    }

    submit() {
        if (this.formGroup.valid) {
            this.including = true;
            this.maintenanceService.post({ ...this.formGroup.value, review_at: moment(this.formGroup.get('review_at').value) } as Maintenance)
                .pipe(untilDestroyed(this))
                .subscribe(
                    () => openModalDialog(this.modalService, { ...modalSuccess, route: 'maquinas' }),
                    () => openModalDialog(this.modalService, { ...modalError, route: 'maquinas' }));
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    ngOnDestroy() {
        this.including = false
    }
}