import { Injectable } from "@angular/core";
import {
  HttpResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, dematerialize, materialize, mergeMap } from "rxjs/operators";
import { Filter } from "./models/filter.model";
import { ReportList } from "./models/repor-list.model";

@Injectable()
export class ReportsFakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/another/reports") && method === "GET":
          return getAnotherReports();
        case url.match(/\/reports\/\d+$/) && method === "GET":
          return getReportById();
        case url.endsWith("/reports") && method === "GET":
          return getReportsInsideObject();
        case url.match(/\/another\/reports\/\d+$/) && method === "GET":
          return getAnotherReportById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getReportsInsideObject() {
      return ok({
        dataPropertyName: "myData",
        myData: fakeReports,
        success: true,
        message: "Any",
      });
    }

    function getReportsPlain() {
      return ok(fakeReports);
    }

    function getAnotherReports() {
      const count = anotherFakeReports.length;

      return ok({
        dataPropertyName: "anotherData",
        anotherData: anotherFakeReports,
        success: true,
        message: "Any",
      });
    }

    function getReportById() {
      const report = fakeReports.find((x) => x.id == idFromUrl());

      return ok({
        dataPropertyName: "myReport",
        myReport: report,
        success: true,
        message: "Any",
      });
    }

    function getAnotherReportById() {
      const report = anotherFakeReports.find((x) => x.id == idFromUrl());

      return ok(report);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }
  }
}

let fakeReports: ReportList[] = [
  {
    id: 1,
    name: "Report 1",
    filters: [
      new Filter(1, "Name", "Enter Your Name", "name", "text", null),
      new Filter(2, "Phone", "Enter Phone", "phone", "text", null),
    ],
  },
  {
    id: 2,
    name: "Report 2",
    filters: [new Filter(3, "Age", "Enter Your Age", "age", "number", null)],
  },
  {
    id: 3,
    name: "Report 3",
    filters: [
      new Filter(4, "Name", "Enter Your Name", "name", "text", null),
      new Filter(5, "Phone", "Enter Phone", "phone", "text", null),
      new Filter(6, "Age", "Enter Your Age", "age", "number", null),
    ],
  },
  {
    id: 4,
    name: "Report 4",
  },
  {
    id: 5,
    name: "Report 5",
    filters: [new Filter(7, "Age", "Enter Your Age", "age", "number", null)],
  },
  {
    id: 6,
    name: "Report 6",
    filters: [
      new Filter(8, "Name", "Enter Your Name", "name", "text", null),
      new Filter(9, "Phone", "Enter Phone", "phone", "text", null),
      new Filter(10, "Age", "Enter Your Age", "age", "number", null),
    ],
  },
];

let anotherFakeReports: ReportList[] = [
  {
    id: 7,
    name: "Report 7",
    filters: [
      new Filter(1, "Name", "Enter Your Name", "name", "text", null),
      new Filter(2, "Phone", "Enter Phone", "phone", "text", null),
    ],
  },
  {
    id: 8,
    name: "Report 8",
    filters: [new Filter(3, "Age", "Enter Your Age", "age", "number", null)],
  },
  {
    id: 9,
    name: "Report 9",
    filters: [
      new Filter(4, "Name", "Enter Your Name", "name", "text", null),
      new Filter(5, "Phone", "Enter Phone", "phone", "text", null),
      new Filter(6, "Age", "Enter Your Age", "age", "number", null),
    ],
  },
  {
    id: 10,
    name: "Report 10",
    filters: [new Filter(7, "Age", "Enter Your Age", "age", "number", null)],
  },
  {
    id: 11,
    name: "Report 11",
    filters: [
      new Filter(8, "Name", "Enter Your Name", "name", "text", null),
      new Filter(9, "Phone", "Enter Phone", "phone", "text", null),
      new Filter(10, "Age", "Enter Your Age", "age", "number", null),
    ],
  },
];
