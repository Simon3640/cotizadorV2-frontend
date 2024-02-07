import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerInDB } from '@interfaces/buyer';
import { ProductInDB } from '@interfaces/product';
import { DialogService } from '@ngneat/dialog';
import { BuyerService } from '@services/buyer.service';
import { LoaderService } from '@services/loader.service';
import { ProductService } from '@services/product.service';
import { SaleService } from '@services/sale.service';
import * as buyerCreateComponent from '@modules/buyer/pages/create/create.component';
import * as productCreateComponent from '@modules/product/pages/create/create.component';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductSaleComponent } from '@modules/sale/components/product-sale/product-sale.component';
import { SaleProducts } from '@interfaces/sale';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public isLoading = this.loaderSvc.isLoading;

  public fecha = false;

  public page_products = 1;

  public limit_products = 10;

  private skip_products = (this.page_products - 1) * this.limit_products;

  public products$ = new Observable<ProductInDB[]>();

  public buyers$ = new Observable<BuyerInDB[]>();

  public page = 1;

  public selectedProducts: ProductInDB[] = [];

  public limit = 10;

  private skip = (this.page - 1) * this.limit;

  public buyerId: number = 0;

  public saleProducts: SaleProducts[] = [];

  constructor(
    private saleSvc: SaleService,
    private productSvc: ProductService,
    private router: Router,
    private loaderSvc: LoaderService,
    private fb: FormBuilder,
    private buyerSvc: BuyerService,
    private modalSvc: DialogService
  ) {
    this.products$ = this.productSvc.getProducts(
      this.skip_products,
      this.limit_products
    );
    this.buyers$ = this.buyerSvc.getBuyers(this.skip, this.limit);
  }

  form_products = this.fb.group({
    search: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  form = this.fb.group({
    search: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

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

  nextPage_products() {
    this.page_products++;
    this.skip_products = (this.page_products - 1) * this.limit_products;
    this.products$ = this.productSvc.getProducts(
      this.skip_products,
      this.limit_products,
      this.form_products.value.search!
    );
  }

  prevPage_products() {
    this.page_products--;
    this.skip_products = (this.page_products - 1) * this.limit_products;
    this.products$ = this.productSvc.getProducts(
      this.skip_products,
      this.limit_products,
      this.form_products.value.search!
    );
  }

  search_products() {
    this.page_products = 1;
    this.skip_products = (this.page_products - 1) * this.limit_products;
    this.products$ = this.productSvc.getProducts(
      this.skip_products,
      this.limit_products,
      this.form_products.value.search!
    );
  }

  openCreateBuyer() {
    const createUser = this.modalSvc.open(
      buyerCreateComponent.CreateComponent,
      {
        data: {
          isModal: true,
        },
      }
    );
  }
  openCreateProduct(){
    const createProduct = this.modalSvc.open(
      productCreateComponent.CreateComponent,
      {
        data: {
          isModal: true,
        },
      }
    );
  }

  pickBuyer(id: number) {
    this.buyerId = id;
  }

  openProductSale(product: ProductInDB) {
    const productSale = this.modalSvc.open(ProductSaleComponent, {
      data: {
        id: product.id,
      },
    });
    productSale.afterClosed$.subscribe((result) => {
      if (result) {
        this.saleProducts.push(result);
        this.selectedProducts.push(product);
      }
    });
  }

  removeProductSale(index: number) {
    this.saleProducts.splice(index, 1);
    this.selectedProducts.splice(index, 1);
  }

  ngOnInit(): void {}

  submit(): void {
    let image = this.saleSvc.postSale(this.saleProducts, this.buyerId);
    image.subscribe((data) => {
      Swal.fire({
        title: 'La venta se registró correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'button is-success is-rounded',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/sales']);
        }
      });
    });
  }
}
