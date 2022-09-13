import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Config } from '../models/config';
import config from '../../assets/config/config-default.json';

@Injectable()
export class ConfigService {
  private static CONFIG_FILE_PATH = 'assets/config/config.json';

  private appConfig: Config | undefined;

  constructor(private injector: Injector) {}

  loadAppConfig() {
    let http = this.injector.get(HttpClient);

    return http
      .get(ConfigService.CONFIG_FILE_PATH)
      .toPromise()
      .then((data: any) => {
        console.log('Successfully found config.json!');
        this.appConfig = data;
      })
      .catch(() => {
        console.log('No config file provided, use config-default.json instead');
        this.appConfig = config;
      });

    // return http.get(ConfigService.CONFIG_FILE_PATH).subscribe({
    //   next: (data: any) => {
    //     console.log('Successfully found config.json!');
    //     this.appConfig = data;
    //   },
    //   error: () => {
    //     console.log('No config file provided, use config-default.json instead');
    //     this.appConfig = config;
    //   },
    // });
  }

  get(): Config {
    return this.appConfig!;
  }
}
