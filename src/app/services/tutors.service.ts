import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TutorsService {
  tutorsUrl: string ="http://localhost:3000/tutors";///annulé ce service

  constructor(private httpClient:HttpClient) { }
  getAllTutors() {
    ///allmatches
    return this.httpClient.get<{tutors:any,message:string}>(this.tutorsUrl);
  }
}
