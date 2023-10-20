import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '@interfaces/area';
import { Empleado } from '@interfaces/empleado';
import { AreaService } from '@services/area.service';
import { EmpleadosService } from '@services/empleado.service';
import { LoaderService } from '@services/loader.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {

  public files: any | undefined;

  public paises = ['COLOMBIA', 'ESTADOS UNIDOS'];

  public isLoading = this.loaderSvc.isLoading;

  public areas : Area[] = [];

  public fecha = false;

  private id = 0;

  constructor(
    private fb: FormBuilder,
    private empleadoSvc: EmpleadosService,
    private router: Router,
    private loaderSvc: LoaderService,
    private areaSvc: AreaService,
    private activatedRoute: ActivatedRoute
  ) {
    this.areaSvc.getAreas().subscribe(
      data => this.areas = data
    )

    const empleado$ = this.activatedRoute.params.pipe(
      switchMap(
        params => {
          this.id = params['id']
          return this.empleadoSvc.getEmpleado(params['id'])
        }
      )
    )

    empleado$.subscribe(
      data => this.form.patchValue(data)
    )

  }

  private regex = "^[A-Z]*$"

  form = this.fb.group({
    primerApellido: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[A-Z ]*$")]],
    segundoApellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(this.regex)]],
    primerNombre: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2), Validators.pattern(this.regex)]],
    otrosNombres: ['', [Validators.maxLength(50), Validators.minLength(2), Validators.pattern("^[A-Z ]*$")]],
    pais: ['COLOMBIA', [Validators.maxLength(50), Validators.minLength(2)]],
    numeroIdentificacion: ['', [Validators.maxLength(20), Validators.minLength(2), Validators.pattern('^[A-Za-z0-9-]*$')]],
    area_id: [0, [Validators.required, Validators.min(1)]],
    is_superuser: [false, [Validators.required]],
    activo: [new Boolean(false), [Validators.required]]
  })

 

  ngOnInit(): void {
  }

  update(): void {
    let image = this.empleadoSvc.putEmpleado(this.form.value as Empleado, this.id);
    image.subscribe(
      data => {
        Swal.fire(
          {
            title: 'El empleado se actualizó correctamente',
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
