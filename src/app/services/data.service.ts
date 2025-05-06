import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObservationData } from '../models/observation-data.model';
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

  constructor(private http: HttpClient) {}

  getData(): Observable<ObservationData[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => {
        // Filter out entries with id (they are duplicates)
        return data.filter(item => !('id' in item));
      })
    );
  }

  updateData(data: ObservationData): Observable<ObservationData> {
    // First get all data to find the existing record
    return this.http.get<any[]>(this.apiUrl).pipe(
      switchMap(allData => {
        // Find the record with matching SamplingTime
        const existingRecord = allData.find(item => 
          (item[0]?.SamplingTime === data.SamplingTime || item.SamplingTime === data.SamplingTime)
        );
        
        if (!existingRecord) {
          throw new Error('Data not found');
        }

        // If the record has an id, use it for the update
        if ('id' in existingRecord) {
          const updateData: DataWithId = {
            id: existingRecord.id,
            0: data
          };
          return this.http.put<DataWithId>(`${this.apiUrl}/${existingRecord.id}`, updateData).pipe(
            map(response => response[0])
          );
        } else {
          // If no id, update the direct record
          return this.http.put<ObservationData>(`${this.apiUrl}/${data.SamplingTime}`, data);
        }
      })
    );
  }
} 