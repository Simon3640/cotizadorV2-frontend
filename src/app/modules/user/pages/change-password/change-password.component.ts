import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import { EmpleadosService } from '@services/user.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public isLoading = this.loaderSvc.isLoading;
  public form: any = null;
  private id = 0;

  constructor(
    private fb: UntypedFormBuilder,
    private userSvc: EmpleadosService,
    private loaderSvc: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const user$ = this.activatedRoute.params.pipe(
      switchMap(
        params => {
          this.id = params['id']
          return this.userSvc.getEmpleado(params['id'])
        }
      )
    )
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const repeatPasswordControl = formGroup.get('repeatPassword');

    if (
      passwordControl &&
      repeatPasswordControl &&
      passwordControl.value !== repeatPasswordControl.value
    ) {
      repeatPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      repeatPasswordControl!.setErrors(null);
    }
  }

  submit() {
    this.userSvc.newPassword(2, this.form.value.password).subscribe({
      next: () => {
        Swal.fire({
          title: 'La contraseña fue actualizada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'button is-success is-rounded',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home']);
          }
        });
      },
    });
  }
}
