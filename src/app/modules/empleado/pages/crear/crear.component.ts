import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from '@interfaces/area';
import { Empleado } from '@interfaces/empleado';
import { AreaService } from '@services/area.service';
import { EmpleadosService } from '@services/empleado.service';
import { LoaderService } from '@services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  public files: any | undefined;

  public paises = ['COLOMBIA', 'ESTADOS UNIDOS']

  public areas: Area[] = []

  public isLoading = this.loaderSvc.isLoading

  public fecha = false

  constructor(
    private fb: FormBuilder,
    private empleadoSvc: EmpleadosService,
    private router: Router,
    private loaderSvc: LoaderService,
    private areaSvc: AreaService
  ) {
    this.areaSvc.getAreas().subscribe(
      data => this.areas = data
    )
  }



  private regex = "^[A-Z]*$"

  form = this.fb.group({
    primerApellido: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[A-Z ]*$")]],
    segundoApellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(this.regex)]],
    primerNombre: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2), Validators.pattern(this.regex)]],
    otrosNombres: [null, [Validators.maxLength(50), Validators.minLength(2), Validators.pattern("^[A-Z ]*$")]],
    pais: ['COLOMBIA', [Validators.maxLength(50), Validators.minLength(2)]],
    numeroIdentificacion: ['', [Validators.maxLength(20), Validators.minLength(2), Validators.pattern('^[A-Za-z0-9-]*$')]],
    fechaIngreso: [new Date(), [Validators.required]],
    area_id: [0, [Validators.required, Validators.min(1)]],
    is_superuser: [false, [Validators.required]]
  })


  validarFecha(e: any) {
    let selected = Date.parse(e.target.value)
    let minDate = Date.now()-1000*60*60*24*30
    if (selected > minDate && selected < Date.now()) {
      this.fecha = false
    }
  }

  ngOnInit(): void {

  }

  submit(): void {
    // new Date(this.form.value.fechaIngreso!)
    let image = this.empleadoSvc.postEmpleado(this.form.value as Empleado);
    image.subscribe(
      data => {
        Swal.fire(
          {
            title: 'El empleado se registró correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'button is-success is-rounded'
            }
          }
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/empleados'])
          }
        })
      }
    )
  }

  isInvalidInput(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }


}
