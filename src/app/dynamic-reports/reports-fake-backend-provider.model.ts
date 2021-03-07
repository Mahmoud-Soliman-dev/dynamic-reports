import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReportsFakeBackendInterceptor } from "./reports-fake-backend-interceptor.service";

export const reportsFakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: ReportsFakeBackendInterceptor,
  multi: true,
};
