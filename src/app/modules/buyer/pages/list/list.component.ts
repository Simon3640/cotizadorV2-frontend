import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerInDB } from '@interfaces/buyer';
import { BuyerService } from '@services/buyer.service';
import { LoaderService } from '@services/loader.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public buyers$ = new Observable<BuyerInDB[]>();

  public page = 1;

  public limit = 10;

  private skip = (this.page - 1) * this.limit;

  public isLoading = this.loaderSvc.isLoading;

  constructor(
    private buyerSvc: BuyerService,
    private router: Router,
    private loaderSvc: LoaderService,
    private fb: FormBuilder
  ) {
    this.buyers$ = this.buyerSvc.getBuyers(this.skip, this.limit);
  }

  form = this.fb.group({
    search: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  ngOnInit(): void {}

  nextPage() {
    this.page++;
    this.skip = (this.page - 1) * this.limit;
    this.buyers$ = this.buyerSvc.getBuyers(
      this.skip,
      this.limit,
      this.form.value.search!
    );
  }

  prevPage() {
    this.page--;
    this.skip = (this.page - 1) * this.limit;
    this.buyers$ = this.buyerSvc.getBuyers(
      this.skip,
      this.limit,
      this.form.value.search!
    );
  }

  search() {
    this.page = 1;
    this.skip = (this.page - 1) * this.limit;
    this.buyers$ = this.buyerSvc.getBuyers(
      this.skip,
      this.limit,
      this.form.value.search!
    );
  }

 

  eliminar(id: number) {
    Swal.fire({
      text: '¿Está seguro de querer eliminar el cliente?',
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
        this.buyerSvc.deleteBuyer(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'El cliente ha sido eliminado',
              icon: 'success',
              confirmButtonText: 'Continuar',
            }).then(() => {
              this.router.navigate(['/buyers']);
            });
          },
        });
      }
    });
  }
}
