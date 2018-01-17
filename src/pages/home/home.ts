import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  people$: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private service: DataService
  ) {
    this.people$ = service.people$;
  }
}
