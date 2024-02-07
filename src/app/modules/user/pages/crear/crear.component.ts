import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from '@interfaces/user';
import { EmpleadosService } from '@services/user.service';
import { LoaderService } from '@services/loader.service';
import Swal from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {
  public files: any | undefined;

  public isLoading = this.loaderSvc.isLoading;

  public fecha = false;

  constructor(
    private fb: FormBuilder,
    private userSvc: EmpleadosService,
    private router: Router,
    private loaderSvc: LoaderService
  ) {}

  private regex = '^[A-Z]*$';

  form = this.fb.group({
    last_names: [
      '',
      [
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[A-Z ]*$'),
        Validators.required
      ],
    ],
    names: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern(this.regex),
      ],
    ],
    email: [
      '',
      [Validators.maxLength(150), Validators.minLength(2), Validators.required],
    ],
    identification: [
      '',
      [Validators.maxLength(20), Validators.minLength(2), Validators.required],
    ],
    is_superuser: [false, [Validators.required]],
  });

  ngOnInit(): void {}

  submit(): void {
    // new Date(this.form.value.fechaIngreso!)
    console.log(this.form.value)
    let image = this.userSvc.postEmpleado(this.form.value as Empleado);
    image.subscribe((data) => {
      Swal.fire({
        title: 'El user se registró correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'button is-success is-rounded',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/users']);
        }
      });
    });
  }

  isInvalidInput(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }
}
