import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataService {
  // private people = new Subject<any[]>();
  // people$: Observable<any[]> = this.people.asObservable();

  people$: Subject<any[]>
  jobs$: Subject<any[]>

  people: any[] = [];
  jobs: any[] = [];

  constructor(private storage: Storage) {
    this.people$ = new Subject();
    this.jobs$ = new Subject();
  }

  load() {
    // storage.set('name', 'Max');
    this.storage.get('jobs').then((jobs) => {
      this.jobs = jobs;
      this.jobs$.next(this.jobs);
    });

    this.storage.get('people').then((people) => {
      this.people = people;
      this.people$.next(this.people);
    });
  }

  addPerson(person: any) {
    this.people.push(person);
    this.people$.next(this.people);
  }

  savePerson(person: any) {

  }

  deletePerson(person: any) {

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

}
