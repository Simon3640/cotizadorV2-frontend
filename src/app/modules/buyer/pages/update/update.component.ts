import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Buyer } from '@interfaces/buyer';
import { BuyerService } from '@services/buyer.service';
import { LoaderService } from '@services/loader.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  public isLoading = this.loaderSvc.isLoading;

  public fecha = false;

  private id = 0;

  constructor(
    private fb: FormBuilder,
    private buyerSvc: BuyerService,
    private router: Router,
    private loaderSvc: LoaderService,
    private activatedRoute: ActivatedRoute
  ) {
    const buyer$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        this.id = params['id'];
        return this.buyerSvc.getBuyer(params['id']);
      })
    );

    buyer$.subscribe((data) => this.form.patchValue(data));
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

  update(): void {
    let image = this.buyerSvc.putBuyer(this.form.value as Buyer, this.id);
    image.subscribe((data) => {
      Swal.fire({
        title: 'El cliente se actualizó correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'button is-success is-rounded',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['../../']);
        }
      });
    });
  }

  submit() {
    Swal.fire({
      text: '¿Está seguro de guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'button is-info is-rounded',
        cancelButton: 'button ml-2 is-dark is-rounded is-outlined',
      },
    }).then((res) => {
      if (res.isConfirmed) {
        this.update();
      }
    });
  }

  isInvalidInput(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }
}
