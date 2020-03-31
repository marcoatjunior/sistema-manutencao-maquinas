import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RolePipe } from './pipes/role.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFontAwesomeModule,
    NgbModule
  ],
  declarations: [
    NavbarComponent,
    ModalDialogComponent,
    LoadingComponent,
    RolePipe
  ],
  exports: [
    NgbModule,
    AngularFontAwesomeModule,
    NavbarComponent,
    LoadingComponent,
    RolePipe
  ],
  entryComponents: [
    ModalDialogComponent
  ]
})
export class SharedModule {
}
