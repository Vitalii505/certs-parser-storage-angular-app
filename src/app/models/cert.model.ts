export interface CertModel {
  serialNumber: string;
  issuer: {
    commonName: string;
  };
  validity: {
    notBefore: string;
    notAfter: string;
  };
  subject: {
    commonName: string;
  };
}
