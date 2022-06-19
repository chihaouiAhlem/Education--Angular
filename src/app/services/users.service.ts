import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrl: string ="http://localhost:3000/users";//BE

  constructor(private httpClient: HttpClient) { }

  ////
  signUpUser(obj:any,img:File){ ///
    let formData=new FormData;////tlm image wel objet
    formData.append('firstName',obj.firstName);
    formData.append('lastName',obj.lastName);
    formData.append('email',obj.email);
    formData.append('password',obj.password);
    formData.append('speciality',obj.speciality);
    formData.append('gender',obj.gender);
    formData.append('tel',obj.tel);
    formData.append('cin',obj.cin);
    formData.append('img',img);
    formData.append('status',obj.status);
    formData.append('role',obj.role);
    return this.httpClient.post<{message:string,user:any}>(`${this.userUrl}/signup`,formData);
 }
//   signUpTutor(obj){ 
//     return this.httpClient.post<{message:string,user:any}>(`${this.userUrl}/signUpTutor`,obj);
//  }
 
 signUpAdmin(obj){ 
  return this.httpClient.post<{message:string,user:any}>(`${this.userUrl}/signUpAdmin`,obj);
}
 getAllUsers(){
   return this.httpClient.get<{users:any,message:any}>(this.userUrl);
 }
 getAllTutors(){
   return this.httpClient.get<{users:any,message:any}>(`${this.userUrl}/tutors`);
 }
 getUserById(id){
   //    return this.httpClient.get(this.matchUrl+"/"+ id);

  return this.httpClient.get<{pp:any}>(`${this.userUrl}/${id}`);

 }
 deleteUserById(id){
   return this.httpClient.delete<{pp:any}>(`${this.userUrl}/${id}`);

  }
  loginUser(obj)
  {    return this.httpClient.post<{message:string,user:any}>(`${this.userUrl}/login`,obj);
 }
 sendSms(obj)
  {    return this.httpClient.post<{message:string}>(`${this.userUrl}/sms`,obj);
 }
 logOut(obj)
  {    //return this.httpClient.get(`${this.userUrl}/${id}`);
 }
  ///
  updateUser(obj) {
    //return this.httpClient.put(`${this.matchUrl}/${id}`,obj);
    return this.httpClient.put<{pp:any}>(`${this.userUrl}/${obj._id}`, obj);
  }
   updatePass(obj,id) {
    //return this.httpClient.put(`${this.matchUrl}/${id}`,obj);
    return this.httpClient.put<{pp:any}>(`${this.userUrl}/pass/${id}`, obj);
 }
 
 
 
}
