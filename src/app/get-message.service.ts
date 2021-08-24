import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMessageService {
  message$ = this.http.get(`/api/GetHelloMessage`);

  constructor(private http: HttpClient) { }


}
