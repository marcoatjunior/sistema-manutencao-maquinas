import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PiecesComponent } from "./pieces.component";
import { AuthGuard } from "@shared/guard";
import { PieceFormComponent } from "./piece-form/piece-form.component";
import { PieceComponent } from "./piece/piece.component";

const routes: Routes = [
  { path: "", component: PiecesComponent, canActivate: [AuthGuard] },
  { path: "n", component: PieceFormComponent },
  { path: ":id", component: PieceFormComponent },
  { path: ":id/d", component: PieceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiecesRoutingModule {}
