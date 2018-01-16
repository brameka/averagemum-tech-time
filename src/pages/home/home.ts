import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private service: DataService
  ) {
    this.service.people$.subscribe(x => {
      console.log('data: ', x);
    });
  }

}
