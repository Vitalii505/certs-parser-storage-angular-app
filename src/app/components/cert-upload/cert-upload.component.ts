import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CertParserService } from '../../services/cert-parser.service';
import { CertFileModel } from '../../models/certFileData.model';
import { CertModel } from '../../models/cert.model';

@Component({
  selector: 'app-cert-upload',
  templateUrl: './cert-upload.component.html',
  styleUrls: ['./cert-upload.component.css'],
})
export class CertUploadComponent {
  constructor(private fileParserService: CertParserService) {}
  @Output()
  certsLoaded: EventEmitter<CertFileModel<CertModel>[]> = new EventEmitter<CertFileModel<CertModel>[]>();

  @ViewChild('certInput', { static: false }) certInput: ElementRef | null = null;

  private async handleFiles(files: FileList) {
    const loadedFiles: CertFileModel<CertModel>[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files.item(i);
        if (file) {
          const parsedData = await this.fileParserService.parseCertificateFile(file);
          loadedFiles.push({ parsedData, file });
        }
      } catch (error) {
        if (typeof error === 'string') alert(error);
      }
    }

    if (files.length > 0) this.certsLoaded.emit(loadedFiles);

    if (this.certInput && this.certInput.nativeElement) {
      this.certInput.nativeElement.value = '';
    }
  }

  onCertSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.handleFiles(input.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files) {
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    }
  }
}
