import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Dashboard } from './shared/dashboard.model';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    loading = false;

    doughnutChartLabels = ['Atrasados', 'Manutenção', 'Em Dia'];
    doughnutChartData = [0, 0, 0];
    doughnutChartType = 'doughnut';
    donutColors = [{ backgroundColor: ['#f94334', '#fcec34', '#62e50e'] }];

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.get() 
            .pipe(untilDestroyed(this))
            .subscribe((value: Dashboard) => {
                this.doughnutChartData = [
                    value.red,
                    value.green,
                    value.yellow
                ]
            });
    }

    ngOnDestroy() { }
}