import { Component, Input } from '@angular/core';
import { CertModel } from '../../models/cert.model';
import { CertFileModel } from '../../models/certFileData.model';
import { CertDownloadService } from '../../services/cert-download.service';

@Component({
  selector: 'app-cert-view',
  templateUrl: './cert-view.component.html',
  styleUrls: ['./cert-view.component.css'],
})
export class CertViewComponent {
  constructor(private certDownloadService: CertDownloadService) {}

  @Input()
  certificate: CertFileModel<CertModel> | undefined = undefined;

  handleDownload = () => {
    if (this.certificate?.file) this.certDownloadService.downloadFile(this.certificate?.file);
    else {
      alert('Помилка при завантаженні');
    }
  };
}
