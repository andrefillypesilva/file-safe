export enum FileStatus {
    INITIAL = 'initial',
    UPLOADED = 'uploaded',
    SUBMITTED = 'submitted',
    ERROR = 'error',
};

export interface FileEntity {
    path: string;
    name: string;
    size: number;
}
