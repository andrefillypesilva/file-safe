export enum FileStatus {
    INITIAL = 'initial',
    DRAGGING = 'dragging',
    UPLOADED = 'uploaded',
    SUBMITTED = 'submitted',
    ERROR = 'error',
};

export interface FileEntity {
    path: string;
    name: string;
    size: number;
}
