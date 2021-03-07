import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class GeneralService {
  reportRoutingPath: BehaviorSubject<string> = new BehaviorSubject('/');
}
