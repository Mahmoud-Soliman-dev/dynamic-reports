import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { DynamicReportsComponent } from "./dynamic-reports.component";
import { ReportsComponent } from "./reports/reports.component";
import { HttpClientModule } from "@angular/common/http";
import { reportsFakeBackendProvider } from "./reports-fake-backend-provider.model";
import { Router, RouterModule } from "@angular/router";

@NgModule({
  declarations: [DynamicReportsComponent, ReportsComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [DynamicReportsComponent, NgMultiSelectDropDownModule],
  providers: [reportsFakeBackendProvider],
  entryComponents: [ReportsComponent]
})
export class DynamicReportsModule {
  static path: string;
  static router: Router;
  constructor(_router: Router) {
    DynamicReportsModule.router = _router;
    console.log("router", _router);
    console.log("path", DynamicReportsModule.path);
    _router.config = _router.config.map((x) => {
      if (x.path == DynamicReportsModule.path) {
        if (!x.children) {
          x.children = [];
        }
        x.children.push({ path: "d-reports", component: ReportsComponent });
      }
      return x;
    });
  }

  static forRoot(parent: string): ModuleWithProviders<DynamicReportsModule> {
    console.log("for root");
    DynamicReportsModule.path = parent;
    return {
      ngModule: DynamicReportsModule,
      providers: [reportsFakeBackendProvider],
    };
  }
}
