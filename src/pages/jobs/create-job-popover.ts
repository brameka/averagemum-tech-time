import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'popover-create-job',
  template: `
  <ion-content>
    <div class="create-job">
      <ion-item>
        <ion-label fixed>Name</ion-label>
        <ion-input type="text" [(ngModel)]="name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Minutes</ion-label>
        <ion-select [(ngModel)]="minutes">
          <ion-option value="0">0</ion-option>
          <ion-option value="15">15</ion-option>
          <ion-option value="30">30</ion-option>
          <ion-option value="45">45</ion-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Hours</ion-label>
        <ion-select [(ngModel)]="hours">
          <ion-option value="0">0</ion-option>
          <ion-option value="1">1</ion-option>
          <ion-option value="2">2</ion-option>
          <ion-option value="3">3</ion-option>
          <ion-option value="4">4</ion-option>
          <ion-option value="5">5</ion-option>
          <ion-option value="6">6</ion-option>
          <ion-option value="7">7</ion-option>
          <ion-option value="8">8</ion-option>
          <ion-option value="9">9</ion-option>
          <ion-option value="10">10</ion-option>
          <ion-option value="11">11</ion-option>
          <ion-option value="12">12</ion-option>
        </ion-select>
      </ion-item>
    </div>
    <button ion-button color="secondary" (click)="cancel()">Cancel</button>
    <button ion-button (click)="save()">Save</button>
  </ion-content>
  `
})
export class CreateJobPopover {

  name: string;
  minutes: number;
  hours: number;

  constructor(public viewController: ViewController) {
    this.name = '';
    this.minutes = 15;
    this.hours = 0;
  }

  save() {
    this.viewController.dismiss({
      name: this.name,
      minutes: this.minutes,
      hours: this.hours
    });
  }

  cancel() {
    this.viewController.dismiss();
  }

}
