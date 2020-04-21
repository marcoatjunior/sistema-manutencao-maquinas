import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Piece } from "./piece.model";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PieceService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Piece[]> {
    return this.httpClient
      .get<Piece[]>(`${environment.apiUrl}/pieces`)
      .pipe(take(1));
  }

  getById(id: number): Observable<Piece> {
    return this.httpClient
      .get<Piece>(`${environment.apiUrl}/pieces/${id}`)
      .pipe(take(1));
  }

  save(piece: Piece): Observable<Piece> {
    if (!piece.id) {
      return this.insert(piece);
    }
    return this.update(piece);
  }

  private insert(piece: Piece): Observable<Piece> {
    return this.httpClient
      .post<Piece>(`${environment.apiUrl}/pieces`, piece)
      .pipe(take(1));
  }

  private update(piece: Piece): Observable<Piece> {
    return this.httpClient
      .put<Piece>(`${environment.apiUrl}/pieces/${piece.id}`, piece)
      .pipe(take(1));
  }

  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/pieces/${id}`)
      .pipe(take(1));
  }
}
