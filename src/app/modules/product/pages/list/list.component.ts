import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductInDB } from '@interfaces/product';
import { LoaderService } from '@services/loader.service';
import { ProductService } from '@services/product.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public products$ = new Observable<ProductInDB[]>();

  public page = 1;

  public limit = 10;

  private skip = (this.page - 1) * this.limit;

  public isLoading = this.loaderSvc.isLoading;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private loaderSvc: LoaderService,
    private fb: FormBuilder
  ) {
    this.products$ = this.productSvc.getProducts(this.skip, this.limit);
  }

  form = this.fb.group({
    search: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    activo: [true],
  });

  ngOnInit(): void {}

  nextPage() {
    this.page++;
    this.skip = (this.page - 1) * this.limit;
    this.products$ = this.productSvc.getProducts(
      this.skip,
      this.limit,
      this.form.value.search!
    );
  }

  prevPage() {
    this.page--;
    this.skip = (this.page - 1) * this.limit;
    this.products$ = this.productSvc.getProducts(
      this.skip,
      this.limit,
      this.form.value.search!
    );
  }

  search() {
    this.page = 1;
    this.skip = (this.page - 1) * this.limit;
    this.products$ = this.productSvc.getProducts(
      this.skip,
      this.limit,
      this.form.value.search!
    );
  }

  uploadFile(event: any) {
    if (event.target.files) {
      let file = event.target.files.item(0);
      this.productSvc.ProductCsv(file!).subscribe({
        next: () => {
          Swal.fire({
            text: 'La lista de productos se ha subido',
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then(() => {
            this.search();
          });
        },
      });
      event.target.value = ''
    }
  }

  eliminar(id: number) {
    Swal.fire({
      text: '¿Está seguro de querer eliminar el product?',
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
        this.productSvc.deleteProduct(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'El product ha sido eliminado',
              icon: 'success',
              confirmButtonText: 'Continuar',
            }).then(() => {
              this.router.navigate(['/products']);
            });
          },
        });
      }
    });
  }
}
