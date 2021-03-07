import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { ParentComponent } from "./parent/parent.component";
import { DynamicReportsModule } from "./dynamic-reports/dynamic-reports.module";
import { ShowSingleReportComponent } from "./show-single-report/show-single-report.component";
import { ReportsComponent } from "./dynamic-reports/reports/reports.component";
import { ParentShowSingleReportComponent } from "./parent-show-single-report/parent-show-single-report.component";
import { DynamicReportsComponent } from "./dynamic-reports/dynamic-reports.component";

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ShowSingleReportComponent,
    ParentShowSingleReportComponent
  ],
  imports: [
    BrowserModule,
    DynamicReportsModule.forRoot('parent-show-single-report'),
    RouterModule.forRoot([
      { path: "", redirectTo: "parent", pathMatch: "full" },
      { path: "parent", component: ParentComponent },
      {
        path: "parent-show-single-report",
        component: ParentShowSingleReportComponent,
        // children: [
        //   {
        //     path: "show-single-report",
        //     component: ShowSingleReportComponent,
        //     // children: [{ path: "d-reports", component: ReportsComponent }],
        //   },
        // ],
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [DynamicReportsComponent],
})
export class AppModule {}
