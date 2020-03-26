﻿import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@shared/models';
import { UserService } from '@shared/services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {
    loading = false;
    users: User[];

    public doughnutChartLabels = ['Peça X', 'Peça Y', 'Peça Z'];
    public doughnutChartData = [1, 1, 1];
    public doughnutChartType = 'doughnut';

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.get().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}