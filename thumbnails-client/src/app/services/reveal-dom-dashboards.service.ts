import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileData } from '../models/reveal-dom-dashboards/file-data';

//const API_ENDPOINT = 'https://revealdom.azurewebsites.net';
//const API_ENDPOINT = 'https://reveal-api.azurewebsites.net';
const API_ENDPOINT = 'http://localhost:5111';

@Injectable({
  providedIn: 'root'
})
export class RevealDomDashboardsService {
  constructor(
    private http: HttpClient
  ) { }

  public getFileDataList(nameOnly: string = 'true'): Observable<FileData[]> {
    const params = new HttpParams()
      .append('nameOnly', nameOnly);
    const options = {
      params,
    };
    return this.http.get<FileData[]>(`${API_ENDPOINT}/dashboards?mode=1`, options);
  }
}
