import { CertFileModel } from '../models/certFileData.model';

type TypeGuard<T> = (obj: T) => obj is T;

export function isCertDataParse<T>(obj: any, typeGuard: TypeGuard<T>): obj is CertFileModel<T> {
  return (
    obj &&
    typeof obj.file === 'object' &&
    obj.file instanceof File &&
    typeof obj.parsedData === 'object' &&
    typeGuard(obj.parsedData)
  );
}
