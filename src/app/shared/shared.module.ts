import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    NavbarComponent
  ],
  exports: [
    NgbModule,
    AngularFontAwesomeModule,
    NavbarComponent
  ],
})
export class SharedModule {
}
