import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';
import _ from 'lodash';

@Injectable()
export class DataService {
  people = [];
  jobs = [];
  session = [];
  platform = 'ios';
  platform$: BehaviorSubject<string>;
  people$: BehaviorSubject<any[]>;
  jobs$: BehaviorSubject<any[]>;
  session$: BehaviorSubject<any[]>;

  constructor(private storage: Storage) {
    this.jobs$ = new BehaviorSubject<any[]>([]);
    this.people$ = new BehaviorSubject<any[]>([]);
    this.session$ = new BehaviorSubject<any[]>([]);
    this.platform$ = new BehaviorSubject<string>(this.platform);
    // this.reset();
    this.load();
  }

  reset() {
    this.storage.set('profiles', []);
    this.storage.set('tasks', []);
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

    this.storage.get('tasks').then((tasks) => {
      if(tasks) {
        this.jobs = tasks;
        this.jobs$.next(this.jobs);
      }
    });

    this.storage.get('profiles').then((profiles) => {
      if(profiles) {
        this.people = profiles;
        this.people$.next(this.people);
      }
    });
  }

  /***************PERSON************************/

  addPerson(person: any) {
    this.people.push(person);
    this.people$.next(this.people);
    this.storage.set('profiles', this.people);
  }

  saveProfiles() {
    this.storage.set('profiles', this.people);
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

  addJob(job: any) {
    this.jobs.push(job);
    this.jobs$.next(this.jobs);
    this.storage.set('tasks', this.jobs);
  }

  saveTasks() {
    this.storage.set('tasks', this.jobs);
  }

  deleteJob(task: any) {
    _.remove(this.jobs, function(value) {
        return value.name === task.name;
    });

    _.each(this.people, function(profile) {
      const tasks: any[] = profile.jobs;
      _.remove(tasks, function(value) {
          return value.name === task.name;
      });
      profile.jobs = tasks;
    });
    this.jobs$.next(this.jobs);
    this.people$.next(this.people);
    this.saveTasks();
    this.saveProfiles();
  }

  setPlatform(platform: string) {
    this.platform = platform;
    this.platform$.next(this.platform);
  }

}
