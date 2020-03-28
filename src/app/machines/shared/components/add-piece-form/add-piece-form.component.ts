import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from '@machines/shared/machine.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Machine } from '@machines/shared/machine.model';
import { Piece } from 'src/app/pieces/shared/piece.model';
import { Observable } from 'rxjs';
import { PieceService } from '@pieces/shared/piece.service';

@Component({
    selector: 'app-add-piece-form',
    templateUrl: './add-piece-form.component.html'
})
export class AddPieceFormComponent implements OnInit, OnDestroy {

    @Input() machine: Machine;
    @Input() modal: NgbActiveModal;

    pieces$: Observable<Piece[]>;
    loading = false;
    formGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private pieceService: PieceService,
        private machineService: MachineService
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            piece: [null, Validators.required],
            minQuantity: ['', Validators.required]
        });

        this.pieces$ = this.pieceService.get();
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.machine.pieces = [{ ...this.formGroup.get('piece').value, minQuantity: this.formGroup.get('minQuantity').value } as Piece];
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