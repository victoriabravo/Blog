import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Comments } from '../components/class/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts/')
  }
  getPost():Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1')
  }

  getComment(){
    return this.http.get('https://jsonplaceholder.typicode.com/comments?postId=1')
  }

  postComment(comment:Comments): Observable<any>{
    return this.http.post('https://jsonplaceholder.typicode.com/posts/',comment)
  }
}



