import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private http= inject (HttpClient);

  private baseApi="https://api.viveplus.com.mx/v1/?key=AQGE23BDKW$";

  obtenerDatos(metodo: string): Observable<any> {

    return this.http.get(this.baseApi+"&m="+metodo);
  }
}
