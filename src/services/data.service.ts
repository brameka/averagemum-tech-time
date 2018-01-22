import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';
import _ from 'lodash';

@Injectable()
export class DataService {
  people = [];
  jobs = [];
  session = [];
  people$: BehaviorSubject<any[]>;
  jobs$: BehaviorSubject<any[]>;
  session$: BehaviorSubject<any[]>;

  constructor(private storage: Storage) {
    this.jobs$ = new BehaviorSubject<any[]>([]);
    this.people$ = new BehaviorSubject<any[]>([]);
    this.session$ = new BehaviorSubject<any[]>([]);
    this.load();
  }

  load() {
    // this.addPerson({
    //   name: 'Hulk',
    //   time: 0,
    //   seconds: 0,
    //   jobs: []
    // });

    // this.addPerson({
    //   name: 'Heman',
    //   time: 0,
    //   seconds: 0,
    //   jobs: []
    // });

    // this.addJob({
    //   name: 'Dishes',
    //   minutes: 15,
    //   hours: 0,
    //   complete: false
    // });

    // this.addJob({
    //   name: 'Lawns',
    //   minutes: 15,
    //   hours: 0,
    //   complete: false
    // });

    // this.addJob({
    //   name: 'Room',
    //   minutes: 30,
    //   hours: 0,
    //   complete: false
    // });

    // this.addJob({
    //   name: 'Lounge',
    //   minutes: 30,
    //   hours: 0,
    //   complete: false
    // });

    // this.addJob({
    //   name: 'Outdoors',
    //   minutes: 30,
    //   hours: 0,
    //   complete: false
    // });

    // this.addJob({
    //   name: 'Milk the cows',
    //   minutes: 30,
    //   hours: 0,
    //   complete: false
    // });

    // this.addJob({
    //   name: 'Sweep',
    //   minutes: 30,
    //   hours: 0,
    //   complete: false
    // });

    // this.addJob({
    //   name: 'Rubbish',
    //   minutes: 30,
    //   hours: 0,
    //   complete: false
    // });

    console.log('load.....');
    // storage.set('name', 'Max');
    // this.storage.get('jobs').then((jobs) => {
    //   this.jobs = jobs;
    //   this.jobs$.next(this.jobs);
    // });

    // this.storage.get('people').then((people) => {
    //   this.people = people;
    //   this.people$.next(this.people);
    // });
  }

  /***************PERSON************************/

  addPerson(person: any) {
    this.people.push(person);
    this.people$.next(this.people);
  }

  savePerson(person: any) {

  }

  deletePerson(person: any) {
    _.remove(this.people, function(value) {
        return value.name === person.name;
    });
  }

  deletePeople() {
    this.people = [];
    this.people$.next(this.people);
  }



  /***************JOBS************************/
  addJob(job: any) {
    this.jobs.push(job);
    this.jobs$.next(this.jobs);
  }

  saveJob(job: any) {

  }

  deleteJob(job: any) {

  }

  /***************PERSON************************/
  addJobToSession(job: any) {
    const sessionJob = {
      job: job,
      user: {},
      complete: false
    };
    this.session.push(sessionJob);
    this.session$.next(this.session);
  }

}
