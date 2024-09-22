import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * ENTITIES
 */
import { FileStatus } from '../../shared/entities/file.model';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent implements OnInit {
  @ViewChild('fileInput') private readonly fileEl!: ElementRef<HTMLInputElement>;
  private selectedFilesSubject = new BehaviorSubject<FileList | null>(null);
  private selectedFiles$ = this.selectedFilesSubject.asObservable();

  public readonly FileStatusEnum = FileStatus;
  public fileStatus: FileStatus = FileStatus.INITIAL;
  public selectedFile: File | null = null;

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
    // submit this.selectedFile
    this.fileStatus = FileStatus.INITIAL;
  }
}
