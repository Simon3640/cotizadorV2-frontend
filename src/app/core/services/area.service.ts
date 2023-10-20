import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '@interfaces/area';
import { prefix } from '@shared/data/ruta.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private urlEndpoint = prefix + 'area/'

  constructor(
    private http: HttpClient
  ) { }

    getAreas(): Observable<Area[]> {
      return this.http.get<Area[]>(this.urlEndpoint)
    }

}
