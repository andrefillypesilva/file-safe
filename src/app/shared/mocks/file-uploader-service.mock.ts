import { of } from "rxjs";

export function fileUploaderServiceMock() {
    let fileUploaderServiceMock = jasmine.createSpyObj(['uploadFile']);
    fileUploaderServiceMock.uploadFile = jasmine.createSpy().and.returnValue(of(true));

    return fileUploaderServiceMock;
}

export function fileUploaderServiceFailedMock() {
    let fileUploaderServiceMock = jasmine.createSpyObj(['uploadFile']);
    fileUploaderServiceMock.uploadFile = jasmine.createSpy().and.returnValue(of(false));

    return fileUploaderServiceMock;
}
