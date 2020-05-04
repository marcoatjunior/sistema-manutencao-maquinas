import { Injectable } from "@angular/core";
import { Http, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private http: Http) {}

  downloadFile(id: number): Observable<Blob> {
    return this.http
      .get(`${environment.apiUrl}/files/${id}`, {
        responseType: ResponseContentType.Blob,
      })
      .pipe(map((res) => res.blob()));
  }
}
