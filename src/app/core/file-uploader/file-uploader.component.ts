import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';

/**
 * ENTITIES
 */
import { FileStatus } from '../../shared/entities/file.model';

/**
 * SERVICES
 */
import { FileUploaderService } from '../../shared/services/file-uploader.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent implements OnInit {
  private readonly fileUploaderService = inject(FileUploaderService);
  private readonly userService = inject(UserService);

  @ViewChild('fileInput') private readonly fileEl!: ElementRef<HTMLInputElement>;
  private readonly selectedFilesSubject = new BehaviorSubject<FileList | null>(null);
  private readonly selectedFiles$ = this.selectedFilesSubject.asObservable();

  public readonly FileStatusEnum = FileStatus;
  public fileStatus: FileStatus = FileStatus.INITIAL;
  public selectedFile: File | null = null;
  public isLoading = false;
  
  public ngOnInit(): void {
    this.selectedFiles$.subscribe((files: FileList | null) => {
      if (files) {
        this.fileStatus = FileStatus.UPLOADED;
        this.selectedFile = files[0];
      }
    });
  }

  public openFileSelector(): void {
    this.fileEl.nativeElement.click();
  }

  public onFileSelector($event: Event): void {
    this.selectedFilesSubject.next(($event.target as HTMLInputElement)?.files);
  }

  public onSubmit(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;

    this.fileUploaderService.uploadFile(this.selectedFile).pipe(
      take(1)      
    ).subscribe((response: boolean) => {
      if (response) {
        this.clearFileUploader();
      } else {
        this.fileStatus = FileStatus.ERROR;
      }
      this.isLoading = false;
    });    
  }

  public onClear(): void {
    this.clearFileUploader();
  }

  public onDrop($event: DragEvent): void {
    $event.preventDefault();

    if ($event.dataTransfer && $event.dataTransfer.files.length > 0) {
      this.selectedFilesSubject.next($event.dataTransfer.files);
    }
  }

  public onDragOver($event: DragEvent): void {
    $event.preventDefault();
    this.fileStatus = FileStatus.DRAGGING;
  }

  public onDragLeave($event: DragEvent): void {
    $event.preventDefault();
    this.fileStatus = FileStatus.INITIAL;
  }

  private clearFileUploader(): void {
    this.fileStatus = FileStatus.INITIAL;
    this.selectedFile = null;
    this.userService.refreshUI();
  }
}
