import { ImportModel } from './import-model.model';

export interface ReportImport {
    reportImportId?: number;
    name: string;
    importModelId: number;
    clientId: number;
    importModel?: ImportModel;
}
