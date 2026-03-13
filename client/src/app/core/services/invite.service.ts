import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InviteCodeVerification, CodeVerifyResponse } from '../../shared/models/invite.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private apiUrl = `${environment.apiUrl}/invite`;

  constructor(private http: HttpClient) {}

  verifyCode(payload: InviteCodeVerification): Observable<CodeVerifyResponse> {
    return this.http.post<CodeVerifyResponse>(`${this.apiUrl}/verify`, payload);
  }
}
