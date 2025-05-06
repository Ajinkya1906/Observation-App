import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ObservationData, Property } from '../models/observation-data.model';
import { switchMap, map } from 'rxjs/operators';

interface DataWithId {
  id: string;
  [key: number]: ObservationData;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/Datas';
  private observationData: ObservationData[] = [];

  constructor(private http: HttpClient) {}

  getData(): Observable<ObservationData[]> {
    return this.http.get<ObservationData[]>(this.apiUrl);
  }
  
  updateData(updatedData: ObservationData): Observable<ObservationData> {
    const url = `${this.apiUrl}/${updatedData.id}`; // Use the 'id' from the updatedData object
    return this.http.put<ObservationData>(url, updatedData);
  }
} 