import { Component } from "@angular/core";
import { SuiToast } from "../classes/toast";
import { SuiToastPosition } from "../classes/toast-position";

@Component({
    selector: "sui-toast-container",
    templateUrl: "./toast-container.component.html",
    styleUrls: ["./toast-container.component.css"]
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
