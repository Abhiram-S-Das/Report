import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpsClient: HttpClient) { }




  public getData(): Observable<any> {
    return this.httpsClient.get<any>(
      'https://keralastats.coronasafe.live/latest.json'
    );
  }
}


