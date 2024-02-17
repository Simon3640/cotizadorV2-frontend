import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '@interfaces/area';
import { Empleado } from '@interfaces/user';
import { AreaService } from '@services/area.service';
import { EmpleadosService } from '@services/user.service';
import { LoaderService } from '@services/loader.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {

  public isLoading = this.loaderSvc.isLoading;

  public fecha = false;

  public id = 0;

  constructor(
    private fb: FormBuilder,
    private userSvc: EmpleadosService,
    private router: Router,
    private loaderSvc: LoaderService,
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

    user$.subscribe(
      data => this.form.patchValue(data)
    )

  }

  private regex = "^[A-Z]*$"

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

 

  ngOnInit(): void {
  }

  update(): void {
    let image = this.userSvc.putEmpleado(this.form.value as Empleado, this.id);
    image.subscribe(
      data => {
        Swal.fire(
          {
            title: 'El user se actualizó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'button is-success is-rounded'
            }
          }
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['../../'])
          }
        })
      }
    )
  }

  submit(){
    Swal.fire({
      text: "¿Está seguro de guardar los cambios?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Actualizar",
      buttonsStyling: false,
      customClass: {
        confirmButton: "button is-info is-rounded",
        cancelButton: "button ml-2 is-dark is-rounded is-outlined"
      }
    }).then((res) => {
      if (res.isConfirmed) {
        this.update()
      }
    })
  }

  isInvalidInput(control: string){
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }


}
