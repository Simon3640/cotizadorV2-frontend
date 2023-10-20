import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoInDB } from '@interfaces/empleado';
import { EmpleadosService } from '@services/empleado.service';
import { LoaderService } from '@services/loader.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  public empleados$ = new Observable<EmpleadoInDB[]>();

  public page = 1;

  public limit = 10;

  private skip = (this.page - 1) * this.limit;

  public isLoading = this.loaderSvc.isLoading;

  constructor(
    private empleadoSvc: EmpleadosService,
    private router: Router,
    private loaderSvc: LoaderService,
    private fb: FormBuilder
  ) {
    this.empleados$ = this.empleadoSvc.getEmpleados(this.skip, this.limit)

  }

  form = this.fb.group({
    search: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    activo: [true]
  })

  ngOnInit(): void {
    
  }

  nextPage(){
    this.page++;
    this.skip = (this.page - 1) * this.limit;
    this.empleados$ = this.empleadoSvc.getEmpleados(this.skip, this.limit,this.form.value.activo!, this.form.value.search!);
  }

  prevPage(){
    this.page--;
    this.skip = (this.page - 1) * this.limit;
    this.empleados$ = this.empleadoSvc.getEmpleados(this.skip, this.limit,this.form.value.activo!, this.form.value.search!);
  }

  search() {
    this.page = 1
    this.skip = (this.page - 1) * this.limit;
    this.empleados$ = this.empleadoSvc.getEmpleados(this.skip, this.limit,this.form.value.activo!, this.form.value.search!);
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
