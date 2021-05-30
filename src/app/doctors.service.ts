import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private http:HttpClient) { }

  getDoctors(){
    return this.http.get(`${environment.docUrl}`)
  }

  updatePatient(id,updatedObj){
    return this.http.put(`${environment.docUrl}/${id}`,updatedObj)
  }

}

