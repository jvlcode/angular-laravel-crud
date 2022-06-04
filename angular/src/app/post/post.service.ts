import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Post } from './post';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://127.0.0.1:8000/api";
  httpOptions = {
    headers :new HttpHeaders({
      'Content-type':'application/json'
    })
  }
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.apiURL+'/posts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(post:any):Observable<Post>{
    return this.httpClient.post<Post>(this.apiURL+'/posts/',JSON.stringify(post),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id:any):Observable<Post>{
    return this.httpClient.get<Post>(this.apiURL+'/posts/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:any,post:any):Observable<Post>{
    return this.httpClient.put<Post>(this.apiURL+'/posts/'+id,JSON.stringify(post),this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  delete(id:any){
    return this.httpClient.delete<Post>(this.apiURL+'/posts/'+id,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message
    }else{
      errorMessage = `Error Code:${error.status}\nMessage:${error.message}`;
    }
    return throwError(errorMessage);
  }

}
