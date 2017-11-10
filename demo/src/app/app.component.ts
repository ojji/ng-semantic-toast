import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { 
  SuiToastService,
  SuiMessageToast,
  SuiToastType,
  SuiToastPosition,
  SuiToastTransition,
  IToastOptions 
} from 'ng-semantic-toast';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Toast demo app';

  constructor(private _toastService: SuiToastService,
              private _viewContainerRef: ViewContainerRef) {
    this._toastService.setRootViewContainerRef(this._viewContainerRef);
  }

  public ngOnInit(): void {
    const options: IToastOptions = {
      transition: new SuiToastTransition('swing up', 700, 'swing up', 700),
      hasCloseIcon: false,
      clickCallback: (t: SuiMessageToast) => {
        t.close();
      },
      position: SuiToastPosition.BottomCenter
    };

    const toast = new SuiMessageToast('This was a triumph!',
            'I\'m making a note here: Huge success. It\'s hard to overstate my satisfaction.',
            SuiToastType.Success(),
            'child',
            options);
    this._toastService.addToast(toast);
  }
}
