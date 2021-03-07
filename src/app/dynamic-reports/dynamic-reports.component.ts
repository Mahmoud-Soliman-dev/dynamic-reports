import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DReportService } from "./d-reports.service";
import { GeneralService } from "./genegal.service";

@Component({
  selector: "dynamic-reports",
  templateUrl: "./dynamic-reports.component.html",
  styleUrls: ["./dynamic-reports.component.css"],
  providers: [DReportService],
})
export class DynamicReportsComponent implements OnChanges, OnInit {
  @Input() reportsApiUrl: string;
  @Input() reportApiUrl: string;
  @Input() reportRouting: string;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  reportListWithFilters = [];
  constructor(private _dReportService: DReportService, private _router: Router) {}

  ngOnChanges() {
    // this._generalService.reportRoutingPath.next(this.reportRouting);
  }

  ngOnInit() {
    this._dReportService
      .getReports(this.reportsApiUrl)
      .subscribe((results: any[]) => {
        this.reportListWithFilters = results;
        const arr = [];
        results.forEach((result) => {
          arr.push({ id: result.id, name: result.name });
        });

        this.dropdownList = arr;

        this.dropdownSettings = {
          singleSelection: true,
          idField: "id",
          textField: "name",
        };
      });
  }

  onItemSelect(item: any) {
    this._router.navigate
  }
}
