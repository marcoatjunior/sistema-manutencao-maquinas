import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { PieceService } from '@pieces/shared/piece.service';
import { Piece } from '@pieces/shared/piece.model';

@Component({
    selector: 'app-piece-form',
    templateUrl: 'piece-form.component.html'
})
export class PieceFormComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    pieceId: number;

    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private pieceService: PieceService
    ) {
        this.pieceId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            stockQuantity: ['', Validators.required]
        });

        this.populateForm();
    }

    private populateForm() {
        if (this.pieceId) {
            this.pieceService.getById(this.pieceId)
                .pipe(untilDestroyed(this))
                .subscribe((piece: Piece) => this.formGroup.patchValue({ ...piece }));
        }
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.pieceService.save(this.formGroup.value as Piece)
                .pipe(untilDestroyed(this))
                .subscribe(() => this.goBack(), () => { this.loading = false });
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}