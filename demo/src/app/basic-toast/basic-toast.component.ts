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
    selector: 'demo-basic-toast',
    templateUrl: './basic-toast.component.html',
    styleUrls: ['./basic-toast.component.css']
})
export class BasicToastComponent implements OnInit {

    private toastTypes = {
        success: SuiToastType.Success(),
        info: SuiToastType.Info(),
        warning: SuiToastType.Warning(),
        error: SuiToastType.Error(),
        custom: SuiToastType.Custom('spooky', 'spooky')
    };

    public header: string = 'This was a triumph!';
    public message: string = 'I\'m making a note here: Huge success.\nIt\'s hard to overstate my satisfaction.';
    public icon: string = 'Child';
    public timeout: number = 0;
    public insertOnTop: boolean = false;
    public hasCloseIcon: boolean = true;
    public hasOnClickCallback: boolean = false;
    public position: string = 'bottom full width';
    public toastType: string = 'success';
    public transitionInDuration: number = 375;
    public transitionOutDuration: number = 300;
    public transitionIn: string = 'fade';
    public transitionOut: string = 'fade';
    public transitionOptions = Object.keys(SuiToastTransitionTypes).map(k => {SuiToastTransitionTypes[k]});
    
    constructor(private _toastService: SuiToastService) { }

    ngOnInit() {
    }

    private defaultHeader = 'This was a triumph!';
    private defaultMessage = 'I\'m making a note here: Huge success.\nIt\'s hard to overstate my satisfaction.';
    private defaultOnClickCallback = (toast: SuiMessageToast) => {
        alert('This message will self-destruct in uh... when you close this alert.');
        toast.close();
    }

    public createToast(): void {
        const msg = this.message.trim() ? this.message.trim().split('\n') : [this.defaultMessage];
        const toastOptions: IToastOptions = {
            timeout: this.timeout,
            hasCloseIcon: this.hasCloseIcon,
            clickCallback: this.hasOnClickCallback ? this.defaultOnClickCallback : null,
            position: this.position as SuiToastPosition,
            insertOnTop: this.insertOnTop,
            transition: new SuiToastTransition(
                this.transitionIn, this.transitionInDuration, 
                this.transitionOut, this.transitionOutDuration)
        };

        const toast = new SuiMessageToast(this.header,
            msg.length === 1 ? msg[0] : msg,
            this.toastTypes[this.toastType],
            this.icon.toLowerCase(),
            toastOptions
        );

        this._toastService.addToast(toast);
    }
}
