import { Component } from '@angular/core';
import { NavParams, ViewController, PopoverController, ToastController } from 'ionic-angular';
import { CreateJobPopover } from './create-job-popover';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'job-picker',
  templateUrl: 'job-picker.html'
})
export class JobPicker {
  jobs: any[];
  person: any;

  constructor(
    public viewController: ViewController,
    public navParams: NavParams,
    public popController: PopoverController,
    public toastController: ToastController,
    public service: DataService
  ) {
    this.person = navParams.get('person');
  }

  close() {
    this.viewController.dismiss();
  }

  select(job) {
    job.active = !job.active;
    this.service.saveProfiles();
  }

  present() {
    let pop = this.popController.create(CreateJobPopover, {}, {
      cssClass: 'create-job-pop'
    });
    pop.onWillDismiss(job => {
      if(job) {
        this.add(job);
      }
    });
    pop.present();
  }

  add(job: any) {
    this.service.addJob(job);
    this.person.jobs.push({
          name: job.name,
          hours: job.hours,
          minutes: job.minutes,
          active: false,
          complete: false,
          state: 'default',
          timeState: 'default'
        });
    this.service.saveProfiles();
    this.showSuccess();
  }

  remove(person: any) {
    this.service.deletePerson(person);
  }

  delete() {
    this.service.deletePeople();
  }

  showSuccess() {
    let toast = this.toastController.create({
      message: 'Task Created',
      duration: 2000
    });
    toast.present();
  }


}
