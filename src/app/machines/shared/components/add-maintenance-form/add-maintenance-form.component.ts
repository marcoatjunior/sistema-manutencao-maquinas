import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Machine } from '@machines/shared/models/machine.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Piece } from 'src/app/pieces/shared/piece.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PieceService } from 'src/app/pieces/shared/piece.service';
import { MaintenanceService } from '@machines/shared/services/maintenance.service';
import { ReviewTypeEnum } from '@machines/shared/enums/review-type.enum';
import { Maintenance } from '@machines/shared/models/maintenance.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { enumSelector } from '@shared/enums';

@Component({
    selector: 'app-add-maintenance-form',
    templateUrl: './add-maintenance-form.component.html'
})
export class AddMaintenanceFormComponent implements OnInit, OnDestroy {

    @Input() machine: Machine;
    @Input() modal: NgbActiveModal;

    pieces$: Observable<Piece[]>;
    loading = false;
    formGroup: FormGroup;

    reviewTypes = enumSelector(ReviewTypeEnum);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private pieceService: PieceService,
        private maintenanceService: MaintenanceService
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            description: ['', Validators.required],
            reviewType: [null, Validators.required],
            machine: [this.machine, Validators.required],
            piece: [null, Validators.required],
            userQuantity: ['', Validators.required],
            reviewAt: ['', Validators.required]
        });

        this.pieces$ = this.pieceService.get();
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.maintenanceService.post(this.formGroup.value as Maintenance)
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