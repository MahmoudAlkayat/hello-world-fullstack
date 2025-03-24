import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HelloWorldEntity {
  id?: number;
  mood: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {
  private apiUrl = 'http://localhost:8080/api/hellos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<HelloWorldEntity[]> {
    return this.http.get<HelloWorldEntity[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<HelloWorldEntity> {
    return this.http.get<HelloWorldEntity>(`${this.apiUrl}/${id}`);
  }

  create(entity: HelloWorldEntity): Observable<HelloWorldEntity> {
    return this.http.post<HelloWorldEntity>(`${this.apiUrl}/create`, entity);
  }

  update(id: number, entity: { mood: string; level: number }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, null, {
      params: {
        mood: entity.mood,
        lvl: entity.level.toString()
      }
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getByMood(mood: string): Observable<HelloWorldEntity[]> {
    return this.http.get<HelloWorldEntity[]>(`${this.apiUrl}/mood/${mood.toLowerCase()}`);
  }

  getByLevel(level: number): Observable<HelloWorldEntity[]> {
    return this.http.get<HelloWorldEntity[]>(`${this.apiUrl}/level/${level}`);
  }

  getByMoodAndLevel(mood: string, level: number): Observable<HelloWorldEntity[]> {
    return this.http.get<HelloWorldEntity[]>(`${this.apiUrl}/mood-and-level`, {
      params: { mood: mood.toLowerCase(), level: level.toString() }
    });
  }

  getByMoodOrLevel(mood: string, level: number): Observable<HelloWorldEntity[]> {
    return this.http.get<HelloWorldEntity[]>(`${this.apiUrl}/mood-or-level`, {
      params: { mood, level: level.toString() }
    });
  }
}
