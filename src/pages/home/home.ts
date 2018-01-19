import { Component, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { NavController, ModalController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { JobPicker } from '../jobs/job-picker';
import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [

       trigger('flip', [
         state('flipped', style({
           transform: 'rotate(180deg)',
           backgroundColor: '#f50e80'
         })),
         transition('* => flipped', animate('400ms ease'))
       ]),

       trigger('flyInOut', [
         state('in', style({
           transform: 'translate3d(0, 0, 0)'
         })),
         state('out', style({
           transform: 'translate3d(150%, 0, 0)'
         })),
         transition('in => out', animate('200ms ease-in')),
         transition('out => in', animate('200ms ease-out'))
       ]),

       trigger('fade', [
         state('visible', style({
           opacity: 1
         })),
         state('invisible', style({
           opacity: 0.1
         })),
         transition('visible <=> invisible', animate('200ms linear'))
       ]),

       trigger('bounce', [
         state('bouncing', style({
           transform: 'translate3d(0,0,0)'
         })),
         transition('* => bouncing', [
           animate('300ms ease-in', keyframes([
             style({transform: 'translate3d(0,0,0)', offset: 0}),
             style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
             style({transform: 'translate3d(0,0,0)', offset: 1})
           ]))
         ])
       ])

     ]
})
export class HomePage implements OnDestroy {
  flipState: String = 'notFlipped';
  flyInOutState: String = 'in';
  fadeState: String = 'visible';
  bounceState: String = 'noBounce';

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

  toggleFlip(){
    this.flipState = (this.flipState == 'notFlipped') ? 'flipped' : 'notFlipped';
  }

  toggleFlyInOut(){

    this.flyInOutState = 'out';

    setInterval(() => {
      this.flyInOutState = 'in';
    }, 2000);

  }

  toggleFade() {
    this.fadeState = (this.fadeState == 'visible') ? 'invisible' : 'visible';
  }

  toggleBounce(){
    this.bounceState = (this.bounceState == 'noBounce') ? 'bouncing' : 'noBounce';
  }
}
