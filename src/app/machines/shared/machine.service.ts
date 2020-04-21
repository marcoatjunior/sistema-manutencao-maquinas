import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "@environments/environment";
import { Machine } from "@machines/shared/machine.model";
import { ManagerMachineDTO } from "./manager-machine-dto.model";
import { PieceMachineDTO } from "./piece-machine-dto.model";

@Injectable()
export class MachineService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Machine[]> {
    return this.httpClient
      .get<Machine[]>(`${environment.apiUrl}/machines`)
      .pipe(take(1));
  }

  getById(id: number): Observable<Machine> {
    return this.httpClient
      .get<Machine>(`${environment.apiUrl}/machines/${id}`)
      .pipe(take(1));
  }

  save(machine: Machine): Observable<Machine> {
    if (!machine.id) {
      return this.insert(machine);
    }
    return this.update(machine);
  }

  private insert(machine: Machine): Observable<Machine> {
    return this.httpClient
      .post(`${environment.apiUrl}/machines`, machine)
      .pipe(take(1));
  }

  private update(machine: Machine): Observable<Machine> {
    return this.httpClient
      .put<Machine>(`${environment.apiUrl}/machines/${machine.id}`, machine)
      .pipe(take(1));
  }

  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/machines/${id}`)
      .pipe(take(1));
  }

  addManager(managerMachine: ManagerMachineDTO): Observable<Machine> {
    return this.httpClient
      .post<Machine>(
        `${environment.apiUrl}/machines/technical-manager`,
        managerMachine
      )
      .pipe(take(1));
  }

  unlinkManager(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/machines/technical-manager/${id}`)
      .pipe(take(1));
  }

  addPiece(pieceMachine: PieceMachineDTO): Observable<Machine> {
    return this.httpClient
      .post<Machine>(`${environment.apiUrl}/machines/piece`, pieceMachine)
      .pipe(take(1));
  }

  unlinkPiece(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/machines/piece/${id}`)
      .pipe(take(1));
  }

  deleteFile(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/machines/file/${id}`)
      .pipe(take(1));
  }
}
