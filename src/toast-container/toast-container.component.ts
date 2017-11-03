import { Component } from "@angular/core";
import { SuiToast } from "../classes/toast";
import { SuiToastPosition } from "../classes/toast-position";

@Component({
    selector: "sui-toast-container",
    template: `
<div class="toast-container {{ position }}">
    <div *ngFor="let toast of toasts">
        <sui-toast [toast]="toast" (onToastClosed)="removeToast($event)"></sui-toast>
    </div>    
</div>`,
    styles: [`
.toast-container {
    position: fixed;
    width: 568px;
    z-index: 999999;
    padding: 1em;
    pointer-events: none;
}
    
.toast-container.bottom {
    bottom: 0;
}
    
.toast-container.full.width {
    left: 0;
    width: 100%;
}
    
.toast-container.center {
    left: 50%;
    transform: translateX(-50%);
}
    
.toast-container.left {
    left: 0;
}
    
.toast-container.right {
    right: 0;
}
    
.toast-container.top {
    top: 0;
}
    
.toast-container > div {
    margin-top: 1rem;
    margin-bottom: 1rem;
    pointer-events: auto;
}
    
.toast-container > div:first-child {
    margin-top: 0;
}
    
.toast-container > div:last-child {
    margin-bottom: 0;
}
`]
})
export class SuiToastContainerComponent {

    public position: SuiToastPosition;
    public toasts: SuiToast[] = [];

    public addToast(toast: SuiToast): void {
        if (toast.insertOnTop) {
            this.toasts.unshift(toast);
        } else {
            this.toasts.push(toast);
        }
    }

    public removeToast(toast: SuiToast): void {
        this.toasts = this.toasts.filter(t => t !== toast);
    }
}
