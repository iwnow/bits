import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { useCrmConfig } from '../config';
import * as utils from '../utils';

@Injectable({ providedIn: 'root' })
export class CommonService {

    readonly http = inject(HttpClient);
    protected readonly config = useCrmConfig();

    apiUrl(url: string): string {
        return utils.url.pathJoin(this.config.apiBaseUrl, url);
    }

}
