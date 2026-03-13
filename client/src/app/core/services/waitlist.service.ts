import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BetaWaitlistInput, BetaWaitlistResponse } from '../../shared/models/waitlist.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  private apiUrl = `${environment.apiUrl}/beta`;

  constructor(private http: HttpClient) {}

  joinWaitlist(payload: BetaWaitlistInput): Observable<BetaWaitlistResponse> {
    return this.http.post<BetaWaitlistResponse>(`${this.apiUrl}/join`, payload);
  }
}
