import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  public isLoading = this.loaderSvc.isLoading;

  constructor(
    private fb: UntypedFormBuilder,
    private authSvc: AuthService,
    private loaderSvc: LoaderService,
    private router: Router
  ) {
    if (this.authSvc.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
  });

  ngOnInit(): void {}

  submit() {
    this.authSvc.recoverPassword(this.form.value.username).subscribe({
      next: () => {
        Swal.fire({
          title: 'La contraseña fue enviada a su correo electrónico',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'button is-success is-rounded',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      },
    });
  }
}
