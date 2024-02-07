import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '@interfaces/product';
import { DialogRef } from '@ngneat/dialog';
import { LoaderService } from '@services/loader.service';
import { ProductService } from '@services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public files: any | undefined;

  public isLoading = this.loaderSvc.isLoading;

  public fecha = false;

  @Input() isModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productSvc: ProductService,
    private router: Router,
    private loaderSvc: LoaderService,
    @Optional()private ref: DialogRef
  ) {
    this.isModal = this.ref? this.ref.data.isModal: false;
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
    let image = this.productSvc.postProduct(this.form.value as Product);
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
        if (result.isConfirmed && !this.isModal) {
          this.router.navigate(['/products']);
        }
        if (this.isModal) {
          this.ref.close();
        }
      });
    });
  }

  isInvalidInput(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }
}
