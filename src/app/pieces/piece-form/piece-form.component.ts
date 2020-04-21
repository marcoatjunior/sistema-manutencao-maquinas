import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { untilDestroyed } from "ngx-take-until-destroy";
import { PieceService } from "@pieces/shared/piece.service";
import { Piece } from "@pieces/shared/piece.model";
import { openModalDialog } from "@shared/components/modal-dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { modalSuccess, modalError } from "@shared/models";

@Component({
  selector: "app-piece-form",
  templateUrl: "piece-form.component.html",
})
export class PieceFormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  pieceId: number;

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pieceService: PieceService,
    private modalService: NgbModal
  ) {
    this.pieceId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      description: ["", Validators.required],
      code: ["", Validators.required],
      stock_quantity: ["", Validators.required],
    });

    this.populateForm();
  }

  private populateForm() {
    if (this.pieceId) {
      this.pieceService
        .getById(this.pieceId)
        .pipe(untilDestroyed(this))
        .subscribe((piece: Piece) => this.formGroup.patchValue({ ...piece }));
    }
  }

  submit() {
    if (this.formGroup.valid) {
      this.loading = true;
      this.pieceService
        .save(this.formGroup.value as Piece)
        .pipe(untilDestroyed(this))
        .subscribe(
          () =>
            openModalDialog(this.modalService, {
              ...modalSuccess,
              route: "pecas",
            }),
          () =>
            openModalDialog(this.modalService, {
              ...modalError,
              route: "pecas",
            })
        );
    } else {
      Object.values(this.formGroup.controls).forEach((control: FormControl) =>
        control.markAsDirty()
      );
    }
  }

  goBack(): void {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.loading = false;
  }
}
