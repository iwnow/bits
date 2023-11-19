import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  protected common = inject(CommonService);

  login(args: AuthLoginParams): Observable<AuthLoginResult> {
    const url = this.common.apiUrl('token');
    const formData = new FormData();
    formData.append('username', args.username);
    formData.append('password', args.password);
    return this.common.http.post<AuthLoginResult>(url, formData);
  }

  sessionInfo() {
    const url = this.common.apiUrl('session-info');
    return this.common.http.get<AuthSessionInfoResult>(url);
  }

  refreshToken(refreshToken: string) {
    const url = this.common.apiUrl('token/refresh');
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${refreshToken}`
    );
    return this.common.http.post<AuthLoginResult>(
      url,
      {},
      {
        headers,
      }
    );
  }
}

export interface AuthLoginParams {
  username: string;
  password: string;
}

export interface AuthLoginResult {
  access_token: string;
  real_user_id: number;
  refresh_token: string;
}

export interface AuthSessionInfoResult {
  user_id: number;
  name: string;
  real_user_id: number;
  roles: string[];
  is_god: boolean;
}
