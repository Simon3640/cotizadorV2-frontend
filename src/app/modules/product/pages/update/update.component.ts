import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@interfaces/product';
import { LoaderService } from '@services/loader.service';
import { ProductService } from '@services/product.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  public files: any | undefined;

  public isLoading = this.loaderSvc.isLoading;

  public fecha = false;

  private id = 0;

  constructor(
    private fb: FormBuilder,
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

    product$.subscribe((data) => this.form.patchValue(data));
  }

  form = this.fb.group({
    reference: [
      '',
      [Validators.minLength(3), Validators.maxLength(50), Validators.required],
    ],
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(2)],
    ],
    description: [
      '',
      [Validators.maxLength(250), Validators.minLength(2), Validators.required],
    ],
    value: [NaN, [Validators.required]],
  });

  ngOnInit(): void {}

  submit(): void {
    // new Date(this.form.value.fechaIngreso!)
    console.log(this.form.value);
    let image = this.productSvc.putProduct(this.form.value as Product, this.id);
    image.subscribe((data) => {
      Swal.fire({
        title: 'El product se registró correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'button is-success is-rounded',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/products']);
        }
      });
    });
  }

  isInvalidInput(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }
}
