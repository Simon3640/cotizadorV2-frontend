import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerInDB } from '@interfaces/buyer';
import { BuyerService } from '@services/buyer.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  private id = 0;

  public buyer: BuyerInDB | undefined;

  constructor(
    private buyerSvc: BuyerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {


    const buyer$ = this.activatedRoute.params.pipe(
      switchMap(
        params => {
          this.id = params['id']
          return this.buyerSvc.getBuyer(params['id'])
        }
      )
    )

    buyer$.subscribe(
      data => this.buyer = data
    )



  }

  ngOnInit(): void {
  }

  eliminar(id: number) {
    Swal.fire({
      text: "¿Está seguro de querer eliminar el cliente?",
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
        this.buyerSvc.deleteBuyer(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'El cliente ha sido eliminado',
              icon: 'success',
              confirmButtonText: 'Continuar'
            }).then(() => {
              this.router.navigate(['/buyers']);
            })
          }
        })
      }
    })
  }
}
