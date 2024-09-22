import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

/**
 * ENTITIES
 */
import { FileEntity } from "../entities/file.model";

@Injectable({
    providedIn: 'root'
})
export class FileListService {
    private readonly http = inject(HttpClient);

    public getFileList(): Observable<FileEntity[]> {
        return this.http.get<FileEntity[]>('http://localhost:3000/files');
    }
}
