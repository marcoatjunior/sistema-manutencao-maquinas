import { fakeBackendProvider } from './shared/services';
import { JwtInterceptor, ErrorInterceptor } from './shared/interceptor';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localePt, 'pt');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
