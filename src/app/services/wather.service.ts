import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WatherService {
  wathersUrl: string ="http://localhost:3000/wathers";


  constructor(private httpClient: HttpClient) { }

  wather(x) {
    return this.httpClient.post<{ result:any}>(`${this.wathersUrl}/`,x);
  }
 

}
