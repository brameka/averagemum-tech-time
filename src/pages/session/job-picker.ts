import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ToastController, ActionSheetController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'job-picker',
  templateUrl: 'job-picker.html'
})
export class JobPicker {
  selectedItem: any;
  isEdit = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popController: PopoverController,
    private toastController: ToastController,
    private actionController: ActionSheetController,
    private service: DataService
  ) { }


}
