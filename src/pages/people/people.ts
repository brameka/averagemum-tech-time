import { Component, OnDestroy } from '@angular/core';
import { ViewController, NavController, NavParams, PopoverController, ToastController, ActionSheetController } from 'ionic-angular';
import { CreatePeoplePopover } from './create-people-popover';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage implements OnDestroy {
  selectedItem: any;
  isEdit = false;
  isModal = false;

  people: any[];
  subscription: any;

  constructor(
    public navCtrl: NavController,
    public viewController: ViewController,
    public navParams: NavParams,
    private popController: PopoverController,
    private toastController: ToastController,
    private actionController: ActionSheetController,
    private service: DataService
  ) {
    this.isModal = navParams.get('modal');
    this.subscription = this.service.people$.subscribe((people) => {
      this.people = people
    });
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  present() {
    let pop = this.popController.create(CreatePeoplePopover, {}, {
      cssClass: 'create-people-pop'
    });
    pop.onWillDismiss(x => {
      if(x) {
        console.log('shouldt add...x: ', x);
        this.add(x.name);
      }
    });
    pop.present();
  }

  add(name: string) {
    this.service.addPerson({
      name: name,
      time: 0,
      seconds: 0,
      jobs: []
    });
    this.showSuccess();
  }

  action(profile: any) {
    if(this.isEdit) {
      this.service.deletePerson(profile);
    }
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
      title: 'Actions',
      buttons: [
        {
          text: 'Remove',
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

  close() {
    this.viewController.dismiss();
  }
}
