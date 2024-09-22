import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * COMPONENT
 */
import { FileListComponent } from './file-list.component';

/**
 * SERVICES
 */
import { UserService } from '../../shared/services/user.service';
import { FileListService } from '../../shared/services/file-list.service';

/**
 * MOCKS
 */
import userServiceMock from '../../shared/mocks/user-service.mock';
import { fileListObjMock, fileListMock } from '../../shared/mocks/file-list-service.mock';

/**
 * ENTITIES
 */
import { FileEntity } from '../../shared/entities/file.model';

describe('FileListComponent', () => {
  let component: FileListComponent;
  let fixture: ComponentFixture<FileListComponent>;
  let userService: UserService = userServiceMock();
  let fileListService: FileListService = fileListMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileListComponent, HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: FileListService, useValue: fileListService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('--- PROPERTIES ---', () => {
    it('should initial fileList$ observable be mocked value', (done: DoneFn) => {
      component.fileList$.subscribe((fileList: FileEntity[]) => {
        expect(fileList).toBe(fileListObjMock);
        done();
      });
    });
  });
});
