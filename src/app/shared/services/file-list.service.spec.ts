import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

/**
 * SERVICE
 */
import { FileListService } from "./file-list.service";

/**
 * MOCKS
 */
import { fileListObjMock } from "../mocks/file-list-service.mock";

/**
 * ENTITIES
 */
import { FileEntity } from "../entities/file.model";

describe('FileListService', () => {
    let fileListService: FileListService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        
        fileListService = TestBed.inject(FileListService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(fileListService).toBeTruthy();
    });

    describe('--- METHODS ---', () => {
        it('should call http request and return correct mock', () => {
            fileListService.getFileList().subscribe((fileList: FileEntity[]) => {
                expect(fileList).toEqual(fileListObjMock);
            });
    
            const req = httpMock.expectOne('http://localhost:3000/files');
            expect(req.request.method).toEqual('GET');
            req.flush(fileListObjMock);
            httpMock.verify();
        });
    });
});
