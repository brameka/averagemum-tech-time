import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'popover-create-people',
  template: `
  <ion-content>
    <form [formGroup]="form">
      <div class="create-people">
        <ion-item>
          <ion-input placeholder="Name" type="text" formControlName="name"></ion-input>
        </ion-item>
      </div>
      <div class="app-create-people__tasks">
        <button ion-button clear color="primary" (click)="cancel()">Cancel</button>
        <button ion-button (click)="save()">Save</button>
      </div>
    </form>
  </ion-content>
  `
})
export class CreatePeoplePopover {
  name: string;
  form: FormGroup;

  constructor(
    public viewController: ViewController,
    private formBuilder: FormBuilder
  ) { 
    this.form = formBuilder.group({
        name: ['', Validators.required]
    });
  }

  save() {
    if(this.form.valid) {
      this.viewController.dismiss({
        name: this.form.controls['name'].value
      });
    }
  }

  cancel() {
    this.viewController.dismiss();
  }

}
