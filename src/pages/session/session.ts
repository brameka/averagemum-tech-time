import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, ActionSheetController } from 'ionic-angular';
import { JobPicker } from './job-picker';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
  selectedItem: any;
  isEdit = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalController: ModalController,
    private toastController: ToastController,
    private actionController: ActionSheetController,
    private service: DataService
  ) {
    this.selectedItem = navParams.get('item');
    // this.service.people$.subscribe(x => {
    //   console.log('data: ', x);
    // });
  }

  pickJobs() {
    let modal = this.modalController.create(JobPicker)
    modal.onWillDismiss(x => {
      this.add(x.name);
    })
    modal.present();
  }

  add(name: string) {
    this.service.addPerson({name: name});
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
