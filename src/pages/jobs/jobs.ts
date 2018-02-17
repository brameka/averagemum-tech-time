import { Component, OnDestroy } from '@angular/core';
import { ViewController, NavController, NavParams, PopoverController, ToastController, ActionSheetController } from 'ionic-angular';
import { CreateJobPopover } from './create-job-popover';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html'
})
export class JobsPage implements OnDestroy {
  selectedItem: any;
  isEdit = false;
  isModal = false;
  tasks: any[];
  subscription: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popController: PopoverController,
    private toastController: ToastController,
    private actionController: ActionSheetController,
    private viewController: ViewController,
    private service: DataService
  ) {
    this.isModal = navParams.get('modal');
    this.subscription = this.service.jobs$.subscribe((tasks) => {
      this.tasks = tasks
    });
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
    this.showSuccess();
  }

  delete(task: any) {
    if(this.isEdit) {
      this.service.deleteJob(task);
    }
  }

  showSuccess() {
    let toast = this.toastController.create({
      message: 'Task Created',
      duration: 2000
    });
    toast.present();
  }

  done() {
    this.isEdit = false;
  }

  close() {
    this.viewController.dismiss();
  }

  more() {
    let actionSheet = this.actionController.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.isEdit = true;
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
