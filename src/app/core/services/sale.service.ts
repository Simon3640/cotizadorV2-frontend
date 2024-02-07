import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  SaleInDB,
  Sale,
  SaleProducts,
  SaleMultiResponse,
  SaleProductResponse,
} from '@interfaces/sale';
import { prefix } from '@shared/data/ruta.api';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private urlEndPoint = prefix + 'sale';

  constructor(private http: HttpClient) {}

  getSales(skip: number = 0, limit: number = 100, search?: string) {
    let params = new HttpParams();
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    if (search) {
      params = params.append('email', search);
      params = params.append('identification', search);
    }
    return this.http.get<SaleMultiResponse[]>(this.urlEndPoint, {
      params: params,
    });
  }

  getSale(id: number = 0) {
    return this.http.get<SaleProductResponse>(this.urlEndPoint + '/' + id);
  }

  postSale(body: SaleProducts[], buyerId: number) {
    let params = new HttpParams();
    params = params.append('buyer_id', buyerId);
    console.log(body);
    return this.http.post<SaleInDB>(this.urlEndPoint, body, { params: params });
  }

  putSale(body: Partial<Sale>, id: number) {
    return this.http.patch<SaleInDB>(this.urlEndPoint + '/' + id, body);
  }

  deleteSale(id: number) {
    return this.http.delete(this.urlEndPoint + '/' + id);
  }

  postConsecutive(number: number) {
    return this.http.post(this.urlEndPoint + '/consecutive', {
      consecutive: number,
    });
  }
}
