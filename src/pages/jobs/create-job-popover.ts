import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'popover-create-job',
  template: `
  <ion-content>
    <form [formGroup]="form">
      <div class="create-job">
        <ion-item>
          <ion-input placeholder="Task" type="text" formControlName="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Minutes</ion-label>
          <ion-select formControlName="minutes">
            <ion-option value="0">0</ion-option>
            <ion-option value="5">5</ion-option>
            <ion-option value="10">10</ion-option>
            <ion-option value="15">15</ion-option>
            <ion-option value="20">20</ion-option>
            <ion-option value="25">25</ion-option>
            <ion-option value="30">30</ion-option>
            <ion-option value="35">35</ion-option>
            <ion-option value="40">40</ion-option>
            <ion-option value="45">45</ion-option>
            <ion-option value="50">50</ion-option>
            <ion-option value="55">55</ion-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Hours</ion-label>
          <ion-select formControlName="hours">
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
      <div class="app-create-job__tasks">
        <button ion-button clear color="primary" (click)="cancel()">Cancel</button>
        <button ion-button (click)="save()">Save</button>
      </div>
    </form>
  </ion-content>
  `
})
export class CreateJobPopover {
  form: FormGroup;

  constructor(
    public viewController: ViewController,
    private formBuilder: FormBuilder
  ) {

    this.form = formBuilder.group({
        name: ['', Validators.required],
        minutes: [15, Validators.required],
        hours: [0, Validators.required]
    });
  }

  save() {
    if(this.form.valid) {
      this.viewController.dismiss({
        name: this.form.controls['name'].value,
        minutes: this.form.controls['minutes'].value,
        hours: this.form.controls['hours'].value,
      });
    }
    
  }

  cancel() {
    this.viewController.dismiss();
  }

}
