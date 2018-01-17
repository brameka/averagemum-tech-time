import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { JobPicker } from '../jobs/job-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  people$: Observable<any[]>;
  jobs$: Observable<any[]>;

  jobs: any[];

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController,
    private service: DataService
  ) {
    this.people$ = service.people$;
    this.jobs$ = service.jobs$;

    this.jobs$.subscribe(x => {
      this.jobs = x;
    });

  }

  pick(person: any) {
    const modal = this.modalController.create(JobPicker, {
      jobs: this.jobs,
      person: person
    });
    modal.present();
  }
}
