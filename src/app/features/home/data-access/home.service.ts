import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../../core/configurations/api-endpoints';
import { CoreService } from '../../../core/services/core.service';
import { Observable } from 'rxjs';
import { SolicitudDto } from '../models/solicitudDto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  endpoints = ApiEndpoints;
  constructor(private coreService: CoreService) { }

  getSolicitudesByFecha(solicitud: string, vencimiento?: string): Observable<SolicitudDto[]>{
    return this.coreService.getByFecha(this.endpoints.solicitud.getSolicitudesByFecha, solicitud, vencimiento);
  }

  createSolicitud(solicitud: any){
    return this.coreService.postSolicitud(this.endpoints.solicitud.creaSolicitud, solicitud);
  }
}
