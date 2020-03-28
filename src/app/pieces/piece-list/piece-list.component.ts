import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Piece } from '@pieces/shared/piece.model';
import { PieceService } from '@pieces/shared/piece.service';

@Component({
    selector: 'app-piece-list',
    templateUrl: 'piece-list.component.html'
})
export class PieceListComponent implements OnInit, OnDestroy {

    pieces$: Observable<Piece[]>;
    selectedPiece: Piece;

    deleteError = '';

    constructor(
        private pieceService: PieceService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.pieces$ = this.pieceService.get();
    }

    openDeleteModal(content, piece) {
        this.selectedPiece = piece;
        this.modalService.open(content);
    }

    deletePiece() {
        this.pieceService.delete(this.selectedPiece.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.pieceService.get(), (err) => this.deleteError = err);
    }

    ngOnDestroy() { }
}