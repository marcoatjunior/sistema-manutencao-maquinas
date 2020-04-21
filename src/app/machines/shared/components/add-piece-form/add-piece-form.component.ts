import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { MachineService } from "@machines/shared/machine.service";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Machine } from "@machines/shared/machine.model";
import { Piece } from "@pieces/shared/piece.model";
import { Observable } from "rxjs";
import { PieceService } from "@pieces/shared/piece.service";
import { openModalDialog } from "@shared/components/modal-dialog";
import { modalSuccess, modalError } from "@shared/models";
import { PieceMachineDTO } from "@machines/shared/piece-machine-dto.model";

@Component({
  selector: "app-add-piece-form",
  templateUrl: "./add-piece-form.component.html",
})
export class AddPieceFormComponent implements OnInit, OnDestroy {
  @Input() machine: Machine;
  @Input() modal: NgbActiveModal;

  pieces$: Observable<Piece[]>;
  including = false;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pieceService: PieceService,
    private machineService: MachineService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      machine_id: [this.machine.id],
      piece_id: [null, Validators.required],
      minimal_quantity: ["", Validators.required],
    });

    this.pieces$ = this.pieceService.get();
  }

  submit() {
    if (this.formGroup.valid) {
      this.including = true;
      this.machineService
        .addPiece(this.formGroup.value as PieceMachineDTO)
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

  ngOnDestroy() {
    this.including = false;
  }
}
