import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-create-people',
  templateUrl: 'create-people.html'
})
export class CreatePeoplePage {

  constructor(public viewController: ViewController) { }

  close() {
    this.viewController.dismiss();
  }

}
