import { Component, OnDestroy } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { JobPicker } from '../jobs/job-picker';
import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {
  people$: Observable<any[]>;
  jobs$: Observable<any[]>;

  jobs: any[] = [];

  subscription: any;

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController,
    private service: DataService
  ) {

    this.people$ = service.people$;
    this.jobs$ = service.jobs$;

    this.subscription = this.jobs$.subscribe(x => {
      const self = this;
      self.jobs = [];
      _.forEach(x, function(job) {
        console.log('inside each: ', job);
        self.jobs.push({
          name: job.name,
          hours: job.hours,
          minutes: job.minutes,
          active: false
        })
      });
    });
  }

  pick(person: any) {

    const modal = this.modalController.create(JobPicker, {
      jobs: this.jobs,
      person: person
    });
    modal.present();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
