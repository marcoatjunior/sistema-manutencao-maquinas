import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Piece } from '@pieces/shared/piece.model';
import { PieceService } from '@pieces/shared/piece.service';
import { openModalDialog } from '@shared/components/modal-dialog';
import { modalSuccess, modalError } from '@shared/models';

@Component({
    selector: 'app-piece-list',
    templateUrl: 'piece-list.component.html'
})
export class PieceListComponent implements OnInit, OnDestroy {

    pieces$: Observable<Piece[]>;
    selectedPiece: Piece;

    excluding = false;

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
        this.excluding = true;
        this.pieceService.delete(this.selectedPiece.id)
            .pipe(untilDestroyed(this))
            .subscribe(
                () => openModalDialog(this.modalService, { ...modalSuccess, route: 'pecas' }),
                () => openModalDialog(this.modalService, { ...modalError, route: 'pecas' }));
    }

    ngOnDestroy() {
        this.excluding = false;
    }
}