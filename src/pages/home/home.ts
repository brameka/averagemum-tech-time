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

        self.jobs.push({
          name: job.name,
          hours: job.hours,
          minutes: job.minutes,
          active: false,
          complete: false
        });

      });
    });
  }

  pick(person: any) {
    const personJobs: any[] = person.jobs;
    _.each(this.jobs, function(job) {
      let exists = personJobs.some(function (x) {
        return x.name === job.name;
      });
      if(!exists) {
        personJobs.push({
          name: job.name,
          hours: job.hours,
          minutes: job.minutes,
          active: false,
          complete: false
        });
      }
    });
    person.jobs = personJobs;
    const modal = this.modalController.create(JobPicker, {
      person: person
    });
    modal.present();
  }

  complete(person, job) {
    console.log('complete: ', job);
    job.complete = !job.complete;
    let minutes: number = +job.minutes + (+job.hours * 60);
    console.log('complete minutes: ', minutes);
    person.time += minutes;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
