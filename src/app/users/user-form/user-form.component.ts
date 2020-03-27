import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@shared/services';
import { User } from '@shared/models';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ProfileEnum, enumSelector } from '@shared/enums/profile.enum';

@Component({
    selector: 'app-user-form',
    templateUrl: 'user-form.component.html',
    styleUrls: ['user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    userId: number;

    loading = false;
    profiles = enumSelector(ProfileEnum);

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.userId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            profile: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            telephone: ['',],
            additional: ['']
        });

        this.populateForm();
    }

    private populateForm() {
        if (this.userId) {
            this.userService.getById(this.userId)
                .pipe(untilDestroyed(this))
                .subscribe((user: User) => this.formGroup.patchValue({ ...user }));
        }
    }

    disableSubmit(): boolean {
        return !(this.formGroup.get('password').value.length > 3 &&
            this.formGroup.get('password').value === this.formGroup.get('confirmPassword').value);
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.userService.save(this.formGroup.value as User)
                .pipe(untilDestroyed(this))
                .subscribe(() => this.goBack(), () => { this.loading = false });
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}