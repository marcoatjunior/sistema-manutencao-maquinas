import { Injectable } from "@angular/core";
import { Http, ResponseContentType, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { map, take } from "rxjs/operators";
import { MachineFile } from "@machines/shared/models/machine-file.model";
import { Machine } from "@machines/shared/machine.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private httpClient: HttpClient, private http: Http, private authService: AuthService) {}

  upload(fileMachine: MachineFile): Observable<Machine> {
    let formData = this.formData(fileMachine);
    const headers = this.header();
    return this.httpClient
      .post<Machine>(`${environment.apiUrl}/files`, formData, { headers })
      .pipe(take(1));
  }

  private header() {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    
    return headers;
  }

  private formData(fileMachine: MachineFile) {
    let formData = new FormData();
    formData.append("machine_id", fileMachine.machine_id as any);
    formData.append("description", fileMachine.description);
    formData.append("archive", fileMachine.archive);
    return formData;
  }

  download(id: number): Observable<Blob> {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.authService.currentUserValue.access_token}`);
    return this.http
      .get(`${environment.apiUrl}/files/${id}`, {
        responseType: ResponseContentType.Blob,
        headers: new Headers(headers)
      })
      .pipe(map((res) => res.blob()));
  }

  delete(id: any): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/files/${id}`)
      .pipe(take(1));
  }
}
