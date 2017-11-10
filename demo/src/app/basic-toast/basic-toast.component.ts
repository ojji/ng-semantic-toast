import { Component, OnInit } from '@angular/core';
import {
    SuiToastService,
    SuiMessageToast,
    SuiToastType,
    SuiToastPosition,
    IToastOptions
} from 'ng-semantic-toast';

@Component({
    selector: 'demo-basic-toast',
    templateUrl: './basic-toast.component.html',
    styleUrls: ['./basic-toast.component.css']
})
export class BasicToastComponent implements OnInit {

    private _toastsToCreate = [
        {
            header: 'This was a triumph!',
            message: 'I\'m making a note here: Huge success. It\'s hard to overstate my satisfaction.',
            type: SuiToastType.Success(),
            timeout: 2000,
            icon: 'child',
            hasCloseIcon: true,
        },
        {
            header: 'This is a spooky message!',
            message: 'So spooky.',
            type: SuiToastType.Custom('spooky', 'brown'),
            timeout: 0,
            icon: 'meh',
            hasCloseIcon: true,
        },
        {
            header: 'This is a message!',
            message: 'This message can be styled (as shown) and dismissed with the close icon in the top right.',
            type: SuiToastType.Info(),
            timeout: 2000,
            icon: 'inbox',
            hasCloseIcon: false,
        },
        {
            header: 'This is a brown message',
            message: 'This brown color is so satisfying it doesn\'t even need an icon.',
            type: SuiToastType.Custom('brown'),
            timeout: 4000,
            icon: 'inbox',
            hasCloseIcon: false,
        },
        {
            header: 'Ah f*ck',
            message: 'I can\'t believe you\'ve done this!',
            type: SuiToastType.Error(),
            timeout: 0,
            icon: 'frown',
            hasCloseIcon: true,
        },
        {
            header: 'Some messages are not like the others',
            message: 'Maybe you want to do something when the user clicks on them.',
            type: SuiToastType.Error(),
            timeout: 0,
            icon: 'bug',
            hasCloseIcon: false,
            clickCallback: (toast: SuiMessageToast) => {
                alert('This message will self-destruct in uh... when you close this alert.');
                toast.close();
            }
        },
        {
            header: 'Was this what you wanted?',
            message: ['It\'s good to see you again.', 'Did you know it\'s been a while?'],
            type: SuiToastType.Info(),
            timeout: 4000,
            icon: 'inbox',
            hasCloseIcon: false,
        },
    ];

    private _nextIndex = 0;
    private _nextPositionIndex = 0;
    private _positions: SuiToastPosition[] = [
        SuiToastPosition.TopLeft,
        SuiToastPosition.BottomLeft,
        SuiToastPosition.BottomCenter,
        SuiToastPosition.BottomRight,
        SuiToastPosition.TopRight,
        SuiToastPosition.TopCenter,
        SuiToastPosition.BottomFullWidth,
        SuiToastPosition.TopFullWidth
    ];

    constructor(private _toastService: SuiToastService) { }

    ngOnInit() {
    }

    public createToast(): void {
        const toastOptions = {
            timeout: this._toastsToCreate[this._nextIndex].timeout,
            hasCloseIcon: this._toastsToCreate[this._nextIndex].hasCloseIcon,
            clickCallback: this._toastsToCreate[this._nextIndex]['clickCallback'],
            position: this._positions[this._nextPositionIndex]
        };

        const toast = new SuiMessageToast(this._toastsToCreate[this._nextIndex].header,
            this._toastsToCreate[this._nextIndex].message,
            this._toastsToCreate[this._nextIndex].type,
            this._toastsToCreate[this._nextIndex].icon,
            toastOptions
        );

        this._toastService.addToast(toast);
        this._nextIndex = (this._nextIndex + 1) % this._toastsToCreate.length;
        this._nextPositionIndex = (this._nextPositionIndex + 1) % this._positions.length;
    }
}
