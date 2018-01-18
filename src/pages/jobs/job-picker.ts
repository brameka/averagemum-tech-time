import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

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
    this.jobs = navParams.get('jobs');
    this.person = navParams.get('person');
  }

  close() {
    this.viewController.dismiss();
  }

  select(job) {
    job.active = !job.active;
  }


}
