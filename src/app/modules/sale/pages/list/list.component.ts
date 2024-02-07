import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaleMultiResponse } from '@interfaces/sale';
import { LoaderService } from '@services/loader.service';
import { SaleService } from '@services/sale.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public sales$ = new Observable<SaleMultiResponse[]>();

  public page = 1;

  public limit = 10;

  private skip = (this.page - 1) * this.limit;

  public isLoading = this.loaderSvc.isLoading;

  constructor(
    private saleSvc: SaleService,
    private router: Router,
    private loaderSvc: LoaderService,
    private fb: FormBuilder
  ) {
    this.sales$ = this.saleSvc.getSales(this.skip, this.limit);
  }

  form = this.fb.group({
    consecutive: [NaN],
  });

  ngOnInit(): void {}

  nextPage() {
    this.page++;
    this.skip = (this.page - 1) * this.limit;
    this.sales$ = this.saleSvc.getSales(this.skip, this.limit);
  }

  prevPage() {
    this.page--;
    this.skip = (this.page - 1) * this.limit;
    this.sales$ = this.saleSvc.getSales(this.skip, this.limit);
  }

  search() {
    this.page = 1;
    this.skip = (this.page - 1) * this.limit;
    this.sales$ = this.saleSvc.getSales(this.skip, this.limit);
  }

  send() {
    this.saleSvc
      .postConsecutive(this.form.value.consecutive!)
      .subscribe(() => {
        Swal.fire({
          text: 'Consecutivo actualizado',
          icon: 'success',
          confirmButtonText: 'Continuar',
        });
      });
  }

  eliminar(id: number) {
    Swal.fire({
      text: '¿Está seguro de querer eliminar la venta?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'button is-danger is-rounded',
        cancelButton: 'button ml-2 is-dark is-rounded is-outlined',
      },
    }).then((res) => {
      if (res.isConfirmed) {
        this.saleSvc.deleteSale(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'La venta ha sido eliminada',
              icon: 'success',
              confirmButtonText: 'Continuar',
            }).then(() => {
              this.router.navigate(['/sales']);
            });
          },
        });
      }
    });
  }
}
