import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "@environments/environment";
import { Machine } from "@machines/shared/machine.model";
import { MachineManager } from "./models/machine-manager.model";
import { MachinePiece } from "./models/machine-piece.model";
import { MachineLog } from "./models/machine-log.model";
import { MachineLogFilter } from "./models/machine-log-filter.model";

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

  getLog(filter: MachineLogFilter): Observable<MachineLog[]> {
    console.log(filter)
    let params = "";
    params += filter && filter.machine_id ? `machine_id=${filter.machine_id}&` : "";
    params += filter && filter.action_id ? `action_id=${filter.action_id}&` : "";
    return this.httpClient
      .get<MachineLog[]>(`${environment.apiUrl}/machines/logs?${params}`)
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

  addManager(managerMachine: MachineManager): Observable<Machine> {
    return this.httpClient
      .post<Machine>(
        `${environment.apiUrl}/machines/technical-manager`,
        managerMachine
      )
      .pipe(take(1));
  }

  unlinkManager(managerMachine: MachineManager): Observable<void> {
    return this.httpClient
      .post<void>(
        `${environment.apiUrl}/machines/technical-manager/remove`,
        managerMachine
      )
      .pipe(take(1));
  }

  addPiece(pieceMachine: MachinePiece): Observable<Machine> {
    return this.httpClient
      .post<Machine>(`${environment.apiUrl}/machines/piece`, pieceMachine)
      .pipe(take(1));
  }

  unlinkPiece(pieceMachine: MachinePiece): Observable<void> {
    return this.httpClient
      .post<void>(`${environment.apiUrl}/machines/piece/remove`, pieceMachine)
      .pipe(take(1));
  }
}
