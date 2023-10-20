import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoInDB } from '@interfaces/empleado';
import { EmpleadosService } from '@services/empleado.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {

  private id = 0;

  public empleado: EmpleadoInDB | undefined;

  constructor(
    private empleadoSvc: EmpleadosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {


    const empleado$ = this.activatedRoute.params.pipe(
      switchMap(
        params => {
          this.id = params['id']
          return this.empleadoSvc.getEmpleado(params['id'])
        }
      )
    )

    empleado$.subscribe(
      data => this.empleado = data
    )



  }

  ngOnInit(): void {
  }

  eliminar(id: number) {
    Swal.fire({
      text: "¿Está seguro de querer eliminar el empleado?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      buttonsStyling: false,
      customClass: {
        confirmButton: "button is-danger is-rounded",
        cancelButton: "button ml-2 is-dark is-rounded is-outlined"
      }
    }).then((res) => {
      if (res.isConfirmed) {
        this.empleadoSvc.deleteEmpleado(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'El empleado ha sido eliminado',
              icon: 'success',
              confirmButtonText: 'Continuar'
            }).then(() => {
              this.router.navigate(['/empleados']);
            })
          }
        })
      }
    })
  }

}
