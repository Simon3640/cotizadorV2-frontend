import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss'],
})
export class ProductSaleComponent implements OnInit {
  constructor(private fb: FormBuilder, public ref: DialogRef) {}

  form = this.fb.group({
    total: [1, [Validators.min(1)]],
    tax: [19, [Validators.max(100), Validators.min(0)]],
    discount: [0, [Validators.max(100), Validators.min(0)]]
  });

  submit() {
    this.ref.close({
      total: this.form.value.total,
      tax: this.form.value.tax,
      product_id: this.ref.data.id,
      discount: this.form.value.discount
    });
  }

  ngOnInit(): void {}
}
