export interface SolicitudDto {
  nombreOrdenante: string;
  apellidoOrdenante: string;
  nombreBeneficiario: string;
  apellidoBeneficiario: string;
  fechaSolicitud: Date;
  fechaVencimiento?: Date;
  monto: number;
}
