import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@shared/services';
import { User, modalSuccess, modalError } from '@shared/models';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { roles } from '@shared/constants';
import { openModalDialog } from '@shared/components/modal-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDTO } from '@users/shared/user-dto.model';

@Component({
    selector: 'app-user-form',
    templateUrl: 'user-form.component.html'
})
export class UserFormComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    userId: number;

    loading = false;
    roles = roles;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private modalService: NgbModal
    ) {
        this.userId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            role: [null, Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
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
            this.userService.save(this.montaUser(this.formGroup.value))
                .pipe(untilDestroyed(this))
                .subscribe(
                    () => openModalDialog(this.modalService, { ...modalSuccess, route: 'usuarios' }),
                    () => openModalDialog(this.modalService, { ...modalError, route: 'usuarios' }));
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    montaUser(data) {
        let userDTO = new UserDTO();
        userDTO.id = this.userId;
        userDTO.name = data.name;
        userDTO.email = data.email;
        userDTO.password = data.password;
        userDTO.profile_id = data.role.id;
        return userDTO;
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.loading = false
    }
}