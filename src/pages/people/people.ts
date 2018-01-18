import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ToastController, ActionSheetController } from 'ionic-angular';
import { CreatePeoplePopover } from './create-people-popover';
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
    private popController: PopoverController,
    private toastController: ToastController,
    private actionController: ActionSheetController,
    private service: DataService
  ) {
    this.selectedItem = navParams.get('item');
    // this.service.people$.subscribe(x => {
    //   console.log('data: ', x);
    // });
  }

  present() {
    let pop = this.popController.create(CreatePeoplePopover, {}, {
      cssClass: 'create-people-pop'
    });
    pop.onWillDismiss(x => {
      this.add(x.name);
    })
    pop.present();
  }

  add(name: string) {
    this.service.addPerson({
      name: name,
      time: {
        hours: 0,
        minutes: 0
      },
      jobs: []
    });
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
