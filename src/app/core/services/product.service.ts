import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta.api';
import { ProductInDB, Product } from '@interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlEndPoint = prefix + 'product';

  constructor(private http: HttpClient) {}

  getProducts(
    skip: number = 0,
    limit: number = 100,
    search?: string
  ) {
    let params = new HttpParams();
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    if (search) {
      params = params.append('name', search);
      params = params.append('reference', search);
    }
    return this.http.get<ProductInDB[]>(this.urlEndPoint, { params: params });
  }

  getProduct(id: number = 0) {
    return this.http.get<ProductInDB>(this.urlEndPoint + '/' + id);
  }

  postProduct(body: Product) {
    return this.http.post<ProductInDB>(this.urlEndPoint, body);
  }

  putProduct(body: Partial<Product>, id: number) {
    return this.http.patch<ProductInDB>(this.urlEndPoint + '/' + id, body);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.urlEndPoint + '/' + id);
  }

  ProductCsv(file: File){
    let body = new FormData();
    body.append('file', file, file.name);
    return this.http.post(this.urlEndPoint + '/csv', body)
  }
    
}
