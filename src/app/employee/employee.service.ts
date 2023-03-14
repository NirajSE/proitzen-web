import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiURL = "http://127.0.0.1:8000/api";

  /*Http Header Options*/

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*Constructor*/

  constructor(private httpClient: HttpClient) { }

  /*getAll*/

  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/employees/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

   /*create*/

   create(employee:Employee): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/employees/', JSON.stringify(employee), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  

   /*find*/

   find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/employees/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /*update*/

  update(id:number, employee:Employee): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  /*delete*/

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/employees/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /*deleteSalary*/

  deleteSalary(id:number,from_date:Date){
    return this.httpClient.delete(this.apiURL + '/employees/salary/' + id +'/'+ from_date, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

   /*deleteTitle*/

   deleteTitle(id:number,from_date:Date,title:string){
    return this.httpClient.delete(this.apiURL + '/employees/titles/' + id +'/'+ from_date +'/'+ title, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /*error Handler*/

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
