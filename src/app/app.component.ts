import { Component, OnInit } from '@angular/core';

import { CertModel } from './models/cert.model';
import { CertFileModel } from './models/certFileData.model';
import { CertStoreService } from './services/cert-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private certStoreService: CertStoreService) {}

  title = 'certificates-viewer-store';
  parsedCert: CertFileModel<CertModel>[] = [];
  selectedCert: CertFileModel<CertModel> | undefined = undefined;
  isCertView = false;
  isCertUploadView = false;

  handleCertLoaded = (newparsedCert: CertFileModel<CertModel>[]) => {
    const serialNumbers = this.parsedCert.map((doc) => doc.parsedData.serialNumber);
    const certDataDuplicated: string[] = [];
    const certOutDuplicate = newparsedCert.filter((doc) => {
      if (serialNumbers.includes(doc.parsedData.serialNumber)) {
        certDataDuplicated.push(doc.parsedData.serialNumber);
        return false;
      }
      return true;
    });

    this.parsedCert = [...this.parsedCert, ...certOutDuplicate];
    this.certStoreService.addToStorage(...certOutDuplicate);

    if (certDataDuplicated.length > 0)
      alert('Сертефікати з такими serialNumber вже додані в систему:\n' + certDataDuplicated.join('\n'));
  };

  handleBtnAddClick = () => {
    this.isCertUploadView = true;
    this.selectedCert = undefined;
    this.isCertView = false;
  };

  handleBtnBackClick = () => {
    this.isCertUploadView = false;
  };

  handleCertificateListItemClick = (id: string) => {
    this.selectedCert = this.parsedCert.find((doc) => doc.parsedData.serialNumber === id);
    this.isCertUploadView = false;
    this.isCertView = true;
  };

  handleDeleteParsedDocument = (serialNumber: string) => {
    this.parsedCert = this.parsedCert.filter((doc) => doc.parsedData.serialNumber !== serialNumber);
    this.certStoreService.deleteItemFromStorage(serialNumber);
  };

  ngOnInit() {
    this.parsedCert = this.certStoreService.getFromStorage();
  }
}
