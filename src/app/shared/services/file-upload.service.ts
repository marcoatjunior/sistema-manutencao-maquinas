import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { take } from "rxjs/operators";

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
}
