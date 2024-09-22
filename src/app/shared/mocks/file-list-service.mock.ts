import { of } from "rxjs";

/**
 * ENTITIES
 */
import { FileEntity } from "../entities/file.model";

export const fileListObjMock: FileEntity[] = [
    {
        path: 'uploads/file1.jpg',
        name: 'file1.jpg',
        size: 256,
    }
];

export function fileListMock() {
    const fileListMock = jasmine.createSpyObj(['getFileList']);
    fileListMock.getFileList = () => (of(fileListObjMock));

    return fileListMock;
}
