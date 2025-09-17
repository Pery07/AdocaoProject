import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private http = inject(HttpClient);
  private base = '/api';
  get<T>(url: string, params?: any){ return this.http.get<T>(this.base + url, { params }); }
  post<T>(url: string, body: any){ return this.http.post<T>(this.base + url, body); }
  put<T>(url: string, body: any){ return this.http.put<T>(this.base + url, body); }
  delete<T>(url: string){ return this.http.delete<T>(this.base + url); }
}
