import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  eventsUrl: string ="http://localhost:3000/events";///a modifier

  constructor(private httpClient: HttpClient) { }
  addEvents(obj:any,img:File) {
    ///matchform
    ///http: livreur /post :yab3ath ///matchUrl:ladresee
    let formData=new FormData;////tlm image wel objet
    formData.append('eventName',obj.eventName);
    formData.append('eventDate',obj.eventDate);
    formData.append('eventDescription',obj.eventDescription);
    formData.append('eventPlace',obj.eventPlace);
    formData.append('eventPrice',obj.eventPrice);
   
    
    formData.append('img',img);


    return this.httpClient.post(this.eventsUrl, formData);
  }
  ////
  getAllEvents() {
    ///allmatches
    return this.httpClient.get<{events:any,response:string}>(this.eventsUrl);
  }

 getEventById(id) {
    //    return this.httpClient.get(this.matchUrl+"/"+ id);

    return this.httpClient.get<{pp:any}>(`${this.eventsUrl}/${id}`);
  }
  deleteEventById(id) {
    return this.httpClient.delete<{pp:string}>(`${this.eventsUrl}/${id}`);
  }
  updateEvent(obj) {
    //return this.httpClient.put(`${this.matchUrl}/${id}`,obj);
    return this.httpClient.put<{pp:string}>(`${this.eventsUrl}/${obj._id}`, obj);
  }
/////////////Reservation

//
addReservationEvent(obj) {
  ///matchform
  ///http: livreur /post :yab3ath ///matchUrl:ladresee
  return this.httpClient.post<{ message:any}>(`${this.eventsUrl}/reservation`,obj);
}
/////////
getAllReservationsByIdUserAndEvents(idUser,idEvent) {
  //    return this.httpClient.get(this.matchUrl+"/"+ id);

  return this.httpClient.get<{message:any}>(`${this.eventsUrl}/${idUser}/${idEvent}`);
}
/////////////

updatePlaces(obj) {
  //return this.httpClient.put(`${this.matchUrl}/${id}`,obj);
  return this.httpClient.put<{pp:any}>(`${this.eventsUrl}/places/${obj.idEvent}`, obj);
}
////reservation student getAllReservationsStudent

//getAllReservationsStudent
getAllReservationsStudentEvent(idUser) {
  ///allmatches
  return this.httpClient.get<{events:any}>(`${this.eventsUrl}/${idUser}/reserv/a`);
}
searchEventByDate(obj){
  return this.httpClient.post<{ events:any}>(`${this.eventsUrl}/search/b/c/d`,obj);


}

}
