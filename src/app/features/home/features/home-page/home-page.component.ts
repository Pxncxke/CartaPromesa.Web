import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../data-access/home.service';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { SolicitudDto } from '../../models/solicitudDto';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { HorasDto } from '../../models/horasDto';
import { MinutosDto } from '../../models/minutosDto';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule,
    DialogModule, FormsModule, InputTextModule,
    ToastModule, CalendarModule, DropdownModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [MessageService, DatePipe]
})
export class HomePageComponent implements OnInit{
  private solicitudSubscription?: Subscription;
  solicitudModel$?: Observable<SolicitudDto[]>;
  model: SolicitudDto;
  fetchSolicitud?: Date;
  fetchVencimiento?: Date;
  searchSolicitud? : Date;
  searchVencimiento? : Date;
  fecha: string = '';
  first = 0;
  rows = 10;
  visible = false;
  isLoading = false;

  horas?: HorasDto[] ;
  selectedHoras: HorasDto | undefined;



  minutos?: MinutosDto[] ;

  selectedMinutos?: MinutosDto;

  constructor(private homeService: HomeService,private datePipe: DatePipe,  private messageService: MessageService){
    this.model = {
      nombreOrdenante: '',
      apellidoOrdenante: '',
      nombreBeneficiario: '',
      apellidoBeneficiario: '',
      fechaSolicitud: new Date,
      fechaVencimiento: new Date,
      monto: 0
    };
  }

  ngOnInit(): void {


    this.horas = [
      { hora:'08', code: '08'},
      { hora:'09', code: '09' },
      { hora:'10', code: '10' },
      { hora:'11', code: '11'},
      { hora:'12', code: '12'},
      { hora:'13', code: '13'},
      { hora:'14', code: '14'},
  ];

  this.minutos = [
    { minuto:'00', code: '00'},
    { minuto:'30', code: '30' }
];
  }


  search() {
    if(this.searchVencimiento === null || this.searchVencimiento === undefined){
      this.solicitudModel$ = this.homeService.getSolicitudesByFecha(this.datePipe.transform(this.searchSolicitud, 'yyyy-MM-dd')!, '');
    }
    else{
      this.fecha = '?vencimiento=' + this.datePipe.transform(this.searchVencimiento, 'yyyy-MM-dd')!;
      this.solicitudModel$ = this.homeService.getSolicitudesByFecha(this.datePipe.transform(this.searchSolicitud, 'yyyy-MM-dd')!, this.fecha);
    }

  }

  showDialog() {
    this.visible = true;
  }

  submit() {
    this.fetchSolicitud = new Date(this.fetchSolicitud?.getFullYear()!, this.fetchSolicitud?.getMonth()!, this.fetchSolicitud?.getDate()!, Number(this.selectedHoras?.hora), Number(this.selectedMinutos?.minuto));

    this.isLoading = true;

    this.model.fechaSolicitud = this.fetchSolicitud;


    if (this.fetchVencimiento !== null || !undefined) {
      console.log(this.fetchVencimiento);
      this.model.fechaVencimiento = this.fetchVencimiento;
    }

    this.solicitudSubscription = this.homeService.createSolicitud(this.model).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Solicitud enviada correctamente'});
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.messageService.add({severity:'error', summary: error.status, detail:'Error al enviar la solicitud'});
      },
      complete: () => {
        this.isLoading = false;
        this.visible = false;
      }

    })
  }
}
