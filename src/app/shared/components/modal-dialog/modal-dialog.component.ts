import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from '@shared/models/modal.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modal-dialog.component.html'
})
export class ModalDialogComponent implements OnInit {

    @Input() data: Modal;

    modal: NgbActiveModal;

    constructor(
        private router: Router,
        private modalService: NgbModal
    ) { }

    ngOnInit() { }

    confirm() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/', this.data.route]);
        this.modalService.dismissAll();
    }
}

export function openModalDialog(modalService: NgbModal, modal: Modal) {
    const modalDialog = modalService.open(ModalDialogComponent, { backdrop: 'static' });
    modalDialog.componentInstance.data = modal;
}