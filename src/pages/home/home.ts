import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, Slides} from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { JobPicker } from '../jobs/job-picker';

import { PeoplePage } from '../people/people';
import { JobsPage } from '../jobs/jobs';

import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy, AfterViewInit {
  @ViewChild(Slides) slides: Slides;
  slideIndex: number = 0;

  flipState: String = 'notFlipped';
  flyInOutState: String = 'in';
  fadeState: String = 'visible';
  bounceState: String = 'noBounce';
  coinState: string = 'static';

  people$: Observable<any[]>;
  jobs$: Observable<any[]>;

  jobs: any[] = [];
  people: any[] = [];

  subscription: any;
  peopleSubscription: any;

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController,
    private actionController: ActionSheetController,
    private service: DataService
  ) {

    this.people$ = service.people$;
    this.jobs$ = service.jobs$;

    this.subscription = this.people$.subscribe(people => {
      this.people = people;
    });

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
          complete: false,
          animate: false
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
    job.animate = true;
    job.complete = !job.complete;
    let minutes: number = +job.minutes + (+job.hours * 60);
    let seconds: number = minutes * 60;
    person.time += minutes;
    person.seconds += seconds;
  }

  ngAfterViewInit() {
    console.log('slides: ', this.slides);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navPeople() {
    this.navCtrl.push(PeoplePage);
  }

  navTasks() {
    this.navCtrl.push(JobsPage);
  }

  more() {
    let actionSheet = this.actionController.create({
      buttons: [
        {
          icon: 'people',
          text: 'Profiles',
          handler: () => {
            this.navPeople();
          }
        },{
          icon: 'clipboard',
          text: 'Tasks',
          handler: () => {
            this.navTasks();
          }
        },{
          icon: 'refresh',
          text: 'Reset',
          handler: () => {
            this.reset();
          }
        },{
          icon: 'close',
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  reset() {
    const person = this.people[this.slideIndex];
    person.jobs = [];
    person.time = 0;
    person.seconds = 0;
  }

  slideChanged() {
    this.slideIndex = this.slides.getActiveIndex();
    console.log('Current index is', this.slideIndex);
  }
}
