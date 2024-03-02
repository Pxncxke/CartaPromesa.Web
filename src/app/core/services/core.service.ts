import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  // getByFecha(solicitud: string){
  //   return this.http.get(`${environment.apiBaseUrl}/${ApiEndpoints.solicitud.getSolicitudesByFecha}/${solicitud}`);
  // }

  getByFecha(endpoint: string, solicitud: string, vencimiento?: string): Observable<any>{
    return this.http.get(`${environment.apiBaseUrl}/${endpoint}/${solicitud}${vencimiento}`);
  }

  postSolicitud(endpoint: string, solicitud: any){
    return this.http.post(`${environment.apiBaseUrl}/${endpoint}`, solicitud);
  }
}
