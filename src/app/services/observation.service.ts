import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observation } from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  private apiUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getObservations(): Observable<Observation> {
    return this.http.get<Observation>(this.apiUrl);
  }

  updateObservation(observation: Observation): Observable<Observation> {
    return this.http.put<Observation>(this.apiUrl, observation);
  }
} 