import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { PieceService } from "@pieces/shared/piece.service";
import { Piece } from "@pieces/shared/piece.model";

@Component({
  selector: "app-piece",
  templateUrl: "piece.component.html",
})
export class PieceComponent implements OnInit, OnDestroy {
  piece$: Observable<Piece>;
  pieceId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pieceService: PieceService
  ) {
    this.pieceId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.piece$ = this.pieceService.getById(this.pieceId);
  }

  goBack(): void {
    this.router.navigate(["../../"], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
