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
  private apiUrl = 'http://localhost:4000/Datas';
  private observationData: ObservationData[] = [];

  constructor(private http: HttpClient) {}

  // getData(): Observable<ObservationData[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map(data => {
  //       // Filter out entries with id (they are duplicates)
  //       return data.filter(item => !('id' in item));
  //     })
  //   );
  // }

  getData(): Observable<ObservationData[]> {
    return this.http.get<ObservationData[]>(this.apiUrl);
  }
  
 

  // updateData(updatedData: ObservationData): Observable<ObservationData | null> {
  //   const index = this.observationData.findIndex((item) => item.Id === updatedData.Id);
  //   if (index !== -1) {
  //     this.observationData[index] = updatedData;
  //     return of(this.observationData[index]);
  //   }
  //   return of(null); // Now allowed
  // }
  
  // updateData(updatedData: ObservationData): Observable<ObservationData | null> {
  //   const index = this.observationData.findIndex(item => item.Id === updatedData.Id);
  //   console.log('Updating ID:', updatedData.Id);
  //   console.log('Found index:', index);
  
  //   if (index !== -1) {
  //     this.observationData[index] = updatedData;
  //     console.log('Updated Data:', this.observationData[index]);
  //     return of(this.observationData[index]);
  //   }
  
  //   console.warn('No matching ID found for update');
  //   return of(null);
  // }
  
  // updateData(updatedData: ObservationData): Observable<ObservationData | null> {
  //   const index = this.observationData.findIndex(item => item.id === updatedData.id);
  //   console.log('Updating id:', updatedData.id);
  //   console.log('Found index:', index);
  
  //   if (index !== -1) {
  //     this.observationData[index] = updatedData;
  //     console.log('Updated Data:', this.observationData[index]);
  //     return of(this.observationData[index]);
  //   }
  
  //   console.warn('No matching id found for update');
  //   return of(null);
  // }
  

  // updateData(updatedData: ObservationData): Observable<void> {
  //   console.log('Incoming updated id:', updatedData.id);
  //   console.log('Current stored data:', this.observationData);
  
  //   const index = this.observationData.findIndex(
  //     item => item.id === updatedData.id
  //   );
  
  //   if (index !== -1) {
  //     this.observationData[index] = { ...updatedData };
  //     console.log('Update successful at index:', index);
  //     return of();
  //   } else {
  //     console.warn('No matching id found for update', updatedData.id);
  //     return throwError(() => new Error('No matching id found for update'));
  //   }
  // }
  

  updateData(updatedData: ObservationData): Observable<ObservationData> {
    const url = `${this.apiUrl}/${updatedData.id}`; // Use the 'id' from the updatedData object
    return this.http.put<ObservationData>(url, updatedData);
  }
  
  // updateData(updatedData: ObservationData): Observable<ObservationData> {
  //   const url = `${this.apiUrl}/1`; // Hardcoded ID = 1
  //   return this.http.put<ObservationData>(url, updatedData);
  // }
  
} 