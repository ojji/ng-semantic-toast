import { Component, OnInit } from '@angular/core';
import { 
  SuiToastService,
  SuiMessageToast,
  SuiToastType,
  SuiToastPosition,
  SuiToastTransition,
  IToastOptions
} from 'ng-semantic-toast';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title = 'Toast demo app';
  constructor(private _toastService: SuiToastService) { }

  ngOnInit() {
    const options = {
      transition: new SuiToastTransition('swing up', 700, 'swing up', 700),
      hasCloseIcon: false,
      clickCallback: (t: SuiMessageToast) => {
        t.close();
      },
      position: SuiToastPosition.BottomCenter,
      timeout: 10000
    };

    const toast = new SuiMessageToast(
      'Hello!',
      ['This info message appears when the home component has been loaded.', 'You can click on it to make it disappear.'],
      SuiToastType.Info(),
      'trophy',
      options
    );
    this._toastService.addToast(toast);
  }

}
