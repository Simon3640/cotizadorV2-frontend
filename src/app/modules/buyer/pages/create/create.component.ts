import { Component, OnInit, Input, inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Buyer } from '@interfaces/buyer';
import { DialogRef } from '@ngneat/dialog';
import { BuyerService } from '@services/buyer.service';
import { LoaderService } from '@services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public isLoading = this.loaderSvc.isLoading;

  public fecha = false;

  @Input() isModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private buyerSvc: BuyerService,
    private router: Router,
    private loaderSvc: LoaderService,
    @Optional()private ref: DialogRef
  ) {
    this.isModal = this.ref? this.ref.data.isModal: false;
  }

  form = this.fb.group({
    last_names: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    names: ['', [Validators.maxLength(50), Validators.minLength(2)]],
    email: [
      '',
      [Validators.maxLength(150), Validators.minLength(2), Validators.required],
    ],
    address: ['', [Validators.maxLength(100), Validators.minLength(2)]],
    phone: ['', [Validators.maxLength(20), Validators.minLength(2)]],
    age: [NaN],
  });

  ngOnInit(): void {}

  submit(): void {
    // new Date(this.form.value.fechaIngreso!)
    let image = this.buyerSvc.postBuyer(this.form.value as Buyer);
    image.subscribe((data) => {
      Swal.fire({
        title: 'El cliente se registró correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'button is-success is-rounded',
        },
      }).then((result) => {
        if (result.isConfirmed && !this.isModal) {
          this.router.navigate(['/buyers']);
        }
        if (this.isModal) {
          this.ref.close()
        }
      });
    });
  }


  isInvalidInput(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }
}
