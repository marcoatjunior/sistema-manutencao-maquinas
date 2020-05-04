import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Machine } from "@machines/shared/machine.model";
import { MachineService } from "@machines/shared/machine.service";
import { FileService } from "@shared/services/file-upload.service";
import { untilDestroyed } from "ngx-take-until-destroy";
import { File } from "@shared/models";
import { saveAs } from "file-saver";

@Component({
  selector: "app-machine",
  templateUrl: "machine.component.html",
})
export class MachineComponent implements OnInit, OnDestroy {
  machine$: Observable<Machine>;
  machineId: number;
  downloadError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private machineService: MachineService,
    private fileService: FileService
  ) {
    this.machineId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.machine$ = this.machineService.getById(this.machineId);
  }

  downloadFile(file: File) {
    this.fileService
      .downloadFile(file.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: Blob) =>
          saveAs(response, `${file.description}.${file.type}`),
        (error) => (this.downloadError = error)
      );
  }

  goBack(): void {
    this.router.navigate(["../../"], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
