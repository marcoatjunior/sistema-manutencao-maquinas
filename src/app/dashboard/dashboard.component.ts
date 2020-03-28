import { Component } from '@angular/core';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    loading = false;

    doughnutChartLabels = ['Atrasados', 'Manutenção', 'Em Dia'];
    doughnutChartData = [2, 1, 0];
    doughnutChartType = 'doughnut';
    donutColors = [{ backgroundColor: ['#f94334', '#fcec34', '#62e50e'] }];

    constructor() { }

    ngOnInit() { }
}