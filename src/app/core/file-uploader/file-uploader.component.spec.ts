import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * COMPONENT
 */
import { FileUploaderComponent } from './file-uploader.component';

/**
 * ENTITIES
 */
import { FileStatus } from '../../shared/entities/file.model';

/**
 * SERVICES
 */
import { UserService } from '../../shared/services/user.service';
import { FileUploaderService } from '../../shared/services/file-uploader.service';

/**
 * MOCKS
 */
import userServiceMock from '../../shared/mocks/user-service.mock';
import { fileUploaderServiceMock, fileUploaderServiceFailedMock } from '../../shared/mocks/file-uploader-service.mock';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;
  let userService: UserService = userServiceMock();
  let fileUploaderService: FileUploaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploaderComponent, HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: FileUploaderService, useValue: fileUploaderServiceMock() },
      ]
    })
    .compileComponents();

    fileUploaderService = TestBed.inject(FileUploaderService);
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('--- METHODS ---', () => {
    describe('when fileUploaderService.uploadFile is success', () => {
      it('should call fileUploaderService.uploadFile when calling onSubmit and property have been updated', () => {
        component.selectedFile = { target: { files: [ { name: 'file1' } ] } } as any;
        component.onSubmit();
  
        expect(fileUploaderService.uploadFile).toHaveBeenCalled();
        expect(component.isLoading).toBeFalse();
        expect(component.fileStatus).toBe(FileStatus.INITIAL);
        expect(component.selectedFile).toBeNull();
        expect(userService.refreshUI).toHaveBeenCalled();
      });
    });

    describe('when fileUploaderService.uploadFile is fail', () => {
      beforeEach(async () => {
        TestBed.resetTestingModule();
        await TestBed.overrideProvider(FileUploaderService, { useValue: fileUploaderServiceFailedMock() })
                      .overrideProvider(UserService, { useValue: userServiceMock() }).compileComponents();
        fileUploaderService = TestBed.inject(FileUploaderService);
        fixture = TestBed.createComponent(FileUploaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
      
      it('should call fileUploaderService.uploadFile when calling onSubmit and property have been updated', () => {
        const selectedFile = { target: { files: [ { name: 'file1' } ] } } as any;
        component.selectedFile = selectedFile;
        component.onSubmit();
  
        expect(fileUploaderService.uploadFile).toHaveBeenCalled();
        expect(component.isLoading).toBeFalse();
        expect(component.fileStatus).toBe(FileStatus.ERROR);
        expect(component.selectedFile).toEqual(selectedFile);
        expect(userService.refreshUI).not.toHaveBeenCalled();
      });
    });

    it('should update fileStatus and selectedFile when calling onFileSelector', () => {
      component.onFileSelector({ target: { files: [ { name: 'file1' } ] } } as any);
      expect(component.fileStatus).toBe(FileStatus.UPLOADED);
      expect(component.selectedFile).toEqual({ name: 'file1' } as any);
    });

    it('should set fileStatus as dragging when event is DragOver and set fileStatus as initial when event is DragLeave', () => {
      component.onDragOver({ preventDefault: () => { } } as DragEvent);
      expect(component.fileStatus).toBe(FileStatus.DRAGGING);

      component.onDragLeave({ preventDefault: () => { } } as DragEvent);
      expect(component.fileStatus).toBe(FileStatus.INITIAL);
    });

    it('should reset initial values when action is clear', () => {
      component.fileStatus = FileStatus.ERROR;
      component.selectedFile = { name: 'file1' } as File;
      component.onClear();

      expect(component.fileStatus).toBe(FileStatus.INITIAL);
      expect(component.selectedFile).toBeNull();
      expect(userService.refreshUI).toHaveBeenCalled();
    });
  });
});
