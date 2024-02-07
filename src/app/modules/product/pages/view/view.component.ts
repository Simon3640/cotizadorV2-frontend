import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductInDB } from '@interfaces/product';
import { LoaderService } from '@services/loader.service';
import { ProductService } from '@services/product.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  private id = 0;

  public product!: ProductInDB;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private loaderSvc: LoaderService,
    private activatedRoute: ActivatedRoute
  ) {
    const product$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        this.id = params['id'];
        return this.productSvc.getProduct(params['id']);
      })
    );

    product$.subscribe((data) => this.product = data);
  }

  ngOnInit(): void {}

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
