import { Component, OnInit } from '@angular/core';
import { 
  SuiToastService,
  SuiMessageToast,
  SuiToastType,
  SuiToastPosition,
  SuiToastTransition,
  SuiToastTransitionTypes,
  IToastOptions 
} from 'ng-semantic-toast';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Toast demo app';

  constructor(private _toastService: SuiToastService) {
  }

  public ngOnInit(): void {
    const options: IToastOptions = {
      transition: new SuiToastTransition(
        SuiToastTransitionTypes.SwingUp, 700,
        SuiToastTransitionTypes.SwingUp, 700),
      hasCloseIcon: false,
      clickCallback: (t: SuiMessageToast) => {
        t.close();
      },
      position: SuiToastPosition.BottomCenter
    };

    const toast = new SuiMessageToast('Page load notification',
            'This message appears on page load.',
            SuiToastType.Info(),
            'info',
            options);
    this._toastService.addToast(toast);
  }
}
