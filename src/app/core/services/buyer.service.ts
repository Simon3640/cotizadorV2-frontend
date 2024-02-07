import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@data/ruta.api';
import { BuyerInDB, Buyer } from '@interfaces/buyer';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  private urlEndPoint = prefix + 'buyer';

  constructor(private http: HttpClient) {}
  getBuyers(
    skip: number = 0,
    limit: number = 100,
    search?: string
  ) {
    let params = new HttpParams();
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    if (search) {
      params = params.append('email', search);
      params = params.append('phone', search);
      params = params.append('names', search);
    }
    return this.http.get<BuyerInDB[]>(this.urlEndPoint, { params: params });
  }

  getBuyer(id: number = 0) {
    return this.http.get<BuyerInDB>(this.urlEndPoint + '/' + id);
  }

  postBuyer(body: Buyer) {
    return this.http.post<BuyerInDB>(this.urlEndPoint, body);
  }

  putBuyer(body: Partial<Buyer>, id: number) {
    return this.http.patch<BuyerInDB>(this.urlEndPoint + '/' + id, body);
  }

  deleteBuyer(id: number) {
    return this.http.delete(this.urlEndPoint + '/' + id);
  }
}
