import { Pipe, PipeTransform } from '@angular/core';
import { CertModel } from '../models/cert.model';
import { CertFileModel } from '../models/certFileData.model';

@Pipe({ standalone: true, name: 'certificatePipe' })
export class CertPipeTransform implements PipeTransform {
  transform(parsedDocuments: CertFileModel<CertModel>[]): { serialNumber: string; commonName: string }[] {
    return parsedDocuments.map((doc) => ({
      serialNumber: doc.parsedData.serialNumber,
      commonName: doc.parsedData.subject.commonName,
    }));
  }
}
