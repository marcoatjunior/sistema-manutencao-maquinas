import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { PiecesComponent } from "./pieces.component";
import { PiecesRoutingModule } from "./pieces-routing.module";
import { PieceListComponent } from "./piece-list/piece-list.component";
import { PieceFormComponent } from "./piece-form/piece-form.component";
import { PieceComponent } from "./piece/piece.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PiecesRoutingModule,
  ],
  declarations: [
    PiecesComponent,
    PieceComponent,
    PieceListComponent,
    PieceFormComponent,
  ],
  exports: [PiecesComponent],
})
export class PiecesModule {}
