import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado, EmpleadoCreate, EmpleadoInDB } from '@interfaces/empleado';
import { prefix } from '@shared/data/ruta.api';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private urlEndPoint = prefix + 'empleado/'

  constructor(
    private http: HttpClient
  ) { }

  getEmpleados(skip: number = 0, limit: number = 100, activo: boolean = true, search?: string) {
    let params = new HttpParams()
    params = params.append('skip', skip)
    params = params.append('limit', limit)
    params = params.append('activo', activo)
    if (search){
      params = params.append('search', search)
    }
    return this.http.get<EmpleadoInDB[]>(this.urlEndPoint, {params:params})
  }


  getEmpleado(id: number = 0) {
    return this.http.get<EmpleadoInDB>(this.urlEndPoint + id)
  }


  postEmpleado(body: Empleado) {
    return this.http.post<EmpleadoInDB>(this.urlEndPoint, body)
  }


  putEmpleado(body: Empleado, id: number) {
    return this.http.put<EmpleadoInDB>(this.urlEndPoint+id, body)
  }


  deleteEmpleado(id:number) {
    return this.http.delete(this.urlEndPoint + id)
  }
}
