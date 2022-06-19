import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
 coursesUrl: string ="http://localhost:3000/courses";
 //coursesUrl: string = "api/allCourses";//Fake BE

  constructor(private httpClient: HttpClient) { }
  ////add courses
  addCourses(obj,img:File) {
    ///matchform
    ///http: livreur /post :yab3ath ///matchUrl:ladresee
    let formData=new FormData;////tlm image wel objet
    formData.append('coursName',obj.coursName);
    formData.append('nbrHours',obj.nbrHours);
    formData.append('coursPlaces',obj.coursPlaces);
    formData.append('coursPrice',obj.coursPrice);
    formData.append('coursDate',obj.coursDate);
    formData.append('coursInfo',obj.coursInfo);
    formData.append('idProf',obj.idProf);
    formData.append('img',img);
    return this.httpClient.post<{response}>(this.coursesUrl,formData);
  }
  ////
   getAllCourses() {
    ///allmatches
    return this.httpClient.get<{courses:any,response:string}>(this.coursesUrl);
  }
  getAllCoursesByProf(idProf) {
    ///allmatches
    console.log("this.idProf",idProf);
    return this.httpClient.get<{courses:any,response:string}>(`${this.coursesUrl}/find/${idProf}`);
  }
  ///

  getCourseById(id) {
    //    return this.httpClient.get(this.matchUrl+"/"+ id);

    return this.httpClient.get<{pp:any}>(`${this.coursesUrl}/${id}`);
  }
  deleteCourseById(id) {
    return this.httpClient.delete<{pp:string}>(`${this.coursesUrl}/${id}`);
  }
  updateCourse(obj:any) {
    //return this.httpClient.put(`${this.matchUrl}/${id}`,obj);
    return this.httpClient.put<{pp:any}>(`${this.coursesUrl}/${obj._id}`, obj);
  }
  updatePlaces(obj) {
    //return this.httpClient.put(`${this.matchUrl}/${id}`,obj);
    return this.httpClient.put<{pp:any}>(`${this.coursesUrl}/places/${obj.idCourse}`, obj);
  }




  /////search  course by price min max
  searchCourse(x) {
    return this.httpClient.post<{ course:any}>(`${this.coursesUrl}/search`,x);
  }


  /////Reservation
  addReservation(obj) {
    ///matchform
    ///http: livreur /post :yab3ath ///matchUrl:ladresee
    return this.httpClient.post<{ message:any}>(`${this.coursesUrl}/reservation`,obj);
  }
///////// 
getAllReservationsByIdUserAndCours(idUser,idCours) {
  //    return this.httpClient.get(this.matchUrl+"/"+ id);

  return this.httpClient.get<{message:any}>(`${this.coursesUrl}/${idUser}/${idCours}`);
}
//getAllReservationsStudent
getAllReservationsStudent(idUser) {
  ///allmatches
  return this.httpClient.get<{courses:any,title:string}>(`${this.coursesUrl}/${idUser}/reserv/a`);
}
getStdentsperCourses(idCourse) {
  ///allmatches
  return this.httpClient.get<{students:any}>(`${this.coursesUrl}/${idCourse}/reserv/a/b`);
}

}
