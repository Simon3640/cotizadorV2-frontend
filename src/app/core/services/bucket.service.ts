import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta.api';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private urlEndpoint = prefix + 'bucket/';

  constructor(private http: HttpClient) {}

  get(key: string) {
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.get(this.urlEndpoint, {
      params: params,
      responseType: 'blob',
    });
  }
}
