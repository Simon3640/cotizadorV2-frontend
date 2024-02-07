import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoInDB } from '@interfaces/user';
import { EmpleadosService } from '@services/user.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {

  private id = 0;

  public user: EmpleadoInDB | undefined;

  constructor(
    private userSvc: EmpleadosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
      data => this.user = data
    )



  }

  ngOnInit(): void {
  }

  eliminar(id: number) {
    Swal.fire({
      text: "¿Está seguro de querer eliminar el user?",
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
        this.userSvc.deleteEmpleado(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'El user ha sido eliminado',
              icon: 'success',
              confirmButtonText: 'Continuar'
            }).then(() => {
              this.router.navigate(['/users']);
            })
          }
        })
      }
    })
  }

}
