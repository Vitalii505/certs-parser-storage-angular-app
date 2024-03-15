import { Injectable } from '@angular/core';
import ASN1, { StreamOrBinary } from '@lapo/asn1js';
import { isCertObj } from '../guards/cert.guard';
import { CertModel } from '../models/cert.model';

@Injectable({
  providedIn: 'root',
})
export class CertParserService {
  parseCertificateFile(file: File): Promise<CertModel> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const getSerialNumber = (originalString: string) => {
        return originalString.substring(originalString.indexOf(')') + 1).trim();
      };

      reader.onload = () => {
        try {
          const result = ASN1.decode(reader.result as StreamOrBinary);
          if (!result || result.typeName() !== 'SEQUENCE') {
            reject(new Error('Неправильна структура конверта сертифіката (очікується SEQUENCE)'));
          }
          const { serialNumber, issuerCommonName, notAfter, subjectCommonName, notBefore } =
            this.parseCertificate(result);

          const certificate = {
            serialNumber: serialNumber ? getSerialNumber(serialNumber) : undefined,
            issuer: { commonName: issuerCommonName },
            validity: { notBefore, notAfter },
            subject: { commonName: subjectCommonName },
          };

          if (isCertObj(certificate)) {
            resolve(certificate);
          } else {
            reject(new Error('Сертифікат не валідний'));
          }
        } catch (error) {
          reject('Файл не підтримується');
        }
      };

      reader.onerror = () => {
        reject(new Error('Помилка читання файла'));
      };

      reader.readAsBinaryString(file);
    });
  }

  private parseCertificate = (certificate: ASN1) => {
    const tbsCertificate = certificate.sub?.[0];
    const serialNumber = tbsCertificate?.sub?.[1].content();
    const issuer = tbsCertificate?.sub?.[3];
    const validity = tbsCertificate?.sub?.[4];
    const subject = tbsCertificate?.sub?.[5];
    const issuerCommonName = issuer?.sub?.[2].sub?.[0].sub?.[1].content();
    const subjectCommonName = subject?.sub?.[1].sub?.[0].sub?.[1].content();
    const notBefore = validity?.sub?.[0].content();
    const notAfter = validity?.sub?.[1].content();

    return { serialNumber, issuerCommonName, subjectCommonName, notBefore, notAfter };
  };
}
