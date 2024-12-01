import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private configUrl = '/assets/config/appconfig.json';  // Path to your JSON file
  private config: AppConfig | null = null;

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>(this.configUrl);
  }

  updateConfig(appconfig : AppConfig): Observable<AppConfig> {
    return this.http.post<AppConfig>(this.configUrl, appconfig, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
  getConfig(): AppConfig | null {
    console.log(this.config?.version)
    return this.config;
  }

  setConfig(config: AppConfig | null): void {
    console.log(this.config?.version)
    this.config = config;
   
  }
}

export interface AppConfig {
  pdfSrc: string;
  visitorCount: number;
  production: boolean;
  appName: string;
  version: string;
}
