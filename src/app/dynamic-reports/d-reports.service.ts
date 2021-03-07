import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class DReportService {
  constructor(private _http: HttpClient) {}

  getReports(apiUrl: string): Observable<any[]> {
    return this._http.get<any[]>(apiUrl).pipe(
      map((result: any) => {
        if (result.dataPropertyName) {
          return result[result.dataPropertyName];
        } else {
          return result;
        }
      })
    );
  }
}
