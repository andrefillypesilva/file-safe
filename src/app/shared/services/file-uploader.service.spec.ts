import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { of } from "rxjs";

/**
 * SERVICE
 */
import { FileUploaderService } from "./file-uploader.service";

describe('FileUploaderService', () => {
    let fileUploaderService: FileUploaderService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        fileUploaderService = TestBed.inject(FileUploaderService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(fileUploaderService).toBeTruthy();
    });

    describe('--- METHODS ---', () => {
        it('should call http request and return correct mock', () => {
            fileUploaderService.uploadFile({} as File).subscribe((response: boolean) => {
                expect(response).toBeTrue();
            });
    
            const req = httpMock.expectOne('http://localhost:3000/upload');
            expect(req.request.method).toEqual('POST');
            req.flush(of(true));
            httpMock.verify();
        });
    });
});
