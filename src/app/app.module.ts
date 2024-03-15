import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertUploadComponent } from './components/cert-upload/cert-upload.component';
import { CertsListComponent } from './components/certs-list/certs-list.component';
import { ClickButtonComponent } from './components/click-button/click-button.component';
import { CertDetailsComponent } from './components/cert-details/cert-details.component';
import { CertViewComponent } from './components/cert-view/cert-view.component';
import { CertPipeTransform } from './pipes/cert-pipe-transform';

@NgModule({
  declarations: [
    AppComponent,
    CertDetailsComponent,
    CertViewComponent,
    CertUploadComponent,
    CertsListComponent,
    ClickButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CertPipeTransform],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
