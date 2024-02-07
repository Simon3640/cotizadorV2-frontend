import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleInDB, SaleProductResponse } from '@interfaces/sale';
import { BucketService } from '@services/bucket.service';
import { LoaderService } from '@services/loader.service';
import { SaleService } from '@services/sale.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  private id = 0;

  public sale!: SaleProductResponse;

  constructor(
    private saleSvc: SaleService,
    private router: Router,
    private bucketSvc: BucketService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    const sale$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        this.id = params['id'];
        return this.saleSvc.getSale(params['id']);
      })
    );

    sale$.subscribe((data) => {
      this.sale = data;
      this.form.patchValue({ status: data.status });
    });
  }

  form = this.fb.group({
    status: [''],
  });

  update() {
    this.saleSvc
      .putSale({ status: this.form.value.status! }, this.id)
      .subscribe({
        next: (data: any) => {
          Swal.fire({
            text: 'La venta ha sido actualizada',
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then(() => {
            this.saleSvc
              .getSale(this.id)
              .subscribe((sale) => (this.sale = sale));
          });
        },
      });
  }

  ngOnInit(): void {}

  openDocument(path: string) {
    this.bucketSvc
      .get(path)
      .subscribe((res) => window.open(window.URL.createObjectURL(res)));
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
