import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class FileUploaderService {
    private http = inject(HttpClient);

    public uploadFile(file: File): Observable<boolean> {
        const formData = new FormData;
        formData.append('files', file);

        return this.http.post('http://localhost:3000/upload', formData).pipe(
            map(_ => true),
            catchError(_ => of(false)),
        );
    }
}
