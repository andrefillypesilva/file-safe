import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

/**
 * ENTITIES
 */
import { FileEntity } from '../../shared/entities/file.model';

/**
 * SERVICES
 */
import { FileListService } from '../../shared/services/file-list.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent implements OnInit {
  private readonly fileListService = inject(FileListService);
  private readonly userService = inject(UserService);

  public fileList$!: Observable<FileEntity[]>;

  public ngOnInit(): void {
    this.setFileList();
    
    this.userService.refreshUI$.subscribe(() => {
      this.setFileList();
    });
  }

  private setFileList(): void {
    this.fileList$ = this.fileListService.getFileList();
  }
}
