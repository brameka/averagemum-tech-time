import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'popover-create-people',
  template: `
  <ion-content>
    <div class="create-people">
      <ion-item>
        <ion-label fixed>Name</ion-label>
        <ion-input type="text" [(ngModel)]="name"></ion-input>
      </ion-item>
    </div>
    <button ion-button color="secondary" (click)="cancel()">Cancel</button>
    <button ion-button (click)="save()">Save</button>
  </ion-content>
  `
})
export class CreatePeoplePopover {
  name: string;

  constructor(public viewController: ViewController) { }

  save() {

    this.viewController.dismiss({
      name: this.name
    });
  }

  cancel() {
    this.viewController.dismiss();
  }

}
