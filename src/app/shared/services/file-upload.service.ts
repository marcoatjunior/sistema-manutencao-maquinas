import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { take } from 'rxjs/operators';
import { File as FileI } from '@machines/shared/file.model';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private httpClient: HttpClient) { }

    post(file: File): Observable<FileI> {
        let formData = new FormData();
        formData.append('upload', file);

        const options = {
            params: new HttpParams(),
            reportProgress: true
        }

        return this.httpClient
            .post<FileI>(`${environment.apiUrl}/uploadFile`, formData, options)
            .pipe(take(1));
    }
}