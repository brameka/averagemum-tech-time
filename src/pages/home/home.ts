import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, Slides} from 'ionic-angular';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { JobPicker } from '../jobs/job-picker';
import { OnboardPage } from '../onboard/onboard';
import { PeoplePage } from '../people/people';
import { JobsPage } from '../jobs/jobs';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('highlight', [
      state('highlighted', style({
        // backgroundColor: 'rgba(88, 30, 202, 0.5)'
        // backgroundColor: '#ff0000'
      })),
      state('default', style({
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
        // backgroundColor: '#ff0'
      })),
      transition('* => highlighted', [
        animate('200ms linear', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(-4px,0,0)', offset: 0.2}),
          style({transform: 'translate3d(4px,0,0)', offset: 0.4}),
          style({transform: 'translate3d(-4px,0,0)', offset: 0.6}),
          style({transform: 'translate3d(4px,0,0)', offset: 0.8}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ]),
      //transition('* => highlighted', animate('200ms ease-in')),
      transition('* => default', animate('100ms linear'))
    ]),
    trigger('time', [
      state('timed', style({
        
      })),
      transition('* => timed', [
        animate('300ms linear', keyframes([
          style({transform: 'scale(1,1) translate3d(0,0,0)', offset: 0}),
          style({transform: 'scale(1.5,1.5) translate3d(-8px,0,0)', offset: 0.5}),
          style({transform: 'scale(1,1) translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class HomePage implements OnDestroy, AfterViewInit {
  @ViewChild(Slides) slides: Slides;
  slideIndex: number = 0;
  state = 'default';

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
    private service: DataService,
    private background: BackgroundMode,
    private localNotifications: LocalNotifications
  ) {
    this.people$ = service.people$;
    this.jobs$ = service.jobs$;
    this.background.enable();
    localNotifications.registerPermission();

    // this.background.on("activate").subscribe(() => {
    //   console.log('background mode enabled from home');
    // });

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
          state: 'default',
          timeState: 'default'
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
    job.state = 'highlighted';
    job.timeState = 'timed';
    job.complete = true;
    let minutes: number = +job.minutes + (+job.hours * 60);
    let seconds: number = minutes * 60;
    person.time += minutes;
    person.seconds += seconds;
    this.service.saveProfiles();
  }

  highlightComplete(job) {
    console.log('highlight complete');
    job.state = 'default';
    
  }

  timeComplete(job) {
    job.timeState = 'default';
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navPeople() {
    this.navCtrl.push(PeoplePage, {
      modal: false
    });
  }

  navTasks() {
    this.navCtrl.push(JobsPage,{
      modal: false
    });
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
    if(this.people && this.people.length > 0) {
      const person = this.people[this.slideIndex];
      _.each(person.jobs, function(job){
        job.complete = false;
      });
      person.time = 0;
      person.seconds = 0;
      this.service.saveProfiles();
    }
  }

  delete() {
    if(this.people && this.people.length > 0) {
      const person = this.people[this.slideIndex];
      person.jobs = [];
      person.time = 0;
      person.seconds = 0;
    }
  }

  slideChanged() {
    this.slideIndex = this.slides.getActiveIndex();
  }

  onboardProfiles() {
    const modal = this.modalController.create(PeoplePage, {
      modal: true
    });
    modal.present();
  }

  onboardTasks() {
    const modal = this.modalController.create(JobsPage, {
      modal: true
    });
    modal.present();
  }
}
