import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ToastController, ActionSheetController } from 'ionic-angular';
import { CreateJobPopover } from './create-job-popover';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html'
})
export class JobsPage {
  selectedItem: any;
  isEdit = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popController: PopoverController,
    private toastController: ToastController,
    private actionController: ActionSheetController,
    private service: DataService
  ) {
    this.selectedItem = navParams.get('item');
  }

  present() {
    let pop = this.popController.create(CreateJobPopover, {}, {
      cssClass: 'create-job-pop'
    });
    pop.onWillDismiss(job => {
      this.add(job);
    })
    pop.present();
  }

  add(job: any) {
    this.service.addJob(job);
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
      message: 'Person Created',
      duration: 2000
    });
    toast.present();
  }

  done() {
    this.isEdit = false;
  }

  more() {
    let actionSheet = this.actionController.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
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
}
