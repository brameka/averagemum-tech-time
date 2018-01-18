import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import _ from 'lodash';

@Component({
  selector: 'job-picker',
  templateUrl: 'job-picker.html'
})
export class JobPicker {
  jobs: any[];
  person: any;

  constructor(
    public viewController: ViewController,
    public navParams: NavParams
  ) {
    this.person = navParams.get('person');
  }

  close() {
    this.viewController.dismiss();
  }

  select(job) {
    job.active = !job.active;
  }

  // select(job) {
  //   job.active = !job.active;
  //   if (job.active) {
  //     let exists = false;
  //     _.each(this.person.jobs, function(jb){
  //       if(jb.name === job.name) {
  //         exists = true;
  //         console.log('job exists: ', jb.name);
  //       }
  //     });

  //     if(!exists) {
  //       this.person.jobs.push({
  //         name: job.name,
  //         hours: job.hours,
  //         minutes: job.minutes,
  //         complete: false
  //       });
  //     }
  //   } else {
  //     _.remove(this.person.jobs, function(jb: any) {
  //         return jb.name === job.name;
  //     });
  //   }


  // }


}
