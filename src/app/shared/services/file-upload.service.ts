import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { take } from "rxjs/operators";
import { File as FileI } from "@shared/models/file.model";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<Blob> {
    return this.httpClient
      .post<Blob>(`${environment.apiUrl}/files/${id}`, { responseType: "blob" })
      .pipe(take(1));
  }

  post(file: File): Observable<FileI> {
    let formData = new FormData();
    formData.append("upload", file);

    const options = {
      params: new HttpParams(),
      reportProgress: true,
    };

    return this.httpClient
      .post<FileI>(`${environment.apiUrl}/files`, formData, options)
      .pipe(take(1));
  }
}
