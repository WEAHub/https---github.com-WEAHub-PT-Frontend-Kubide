import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  private appConfig: any;
  loaded: boolean = false;

  constructor(private http: HttpClient) {
  }

  loadAppConfig() {
    return this.http.get('/assets/config/app-settings.json')
      .pipe(
        map(jsonConfig => {
          this.appConfig = jsonConfig
          this.loaded = true
        }),
        catchError(error => {
          throw Error(error)
        })
    )
  }

  get apiBaseUrl(): string {
    return this.appConfig.apiBaseUrl;
  }

  get apiGetCharacters(): string {
    return this.apiBaseUrl + this.appConfig.apiRoutes.characters;
  }

  get apiKey(): string {
    return this.appConfig.apiKey;
  }
}
