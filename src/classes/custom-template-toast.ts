import { TemplateRef } from "@angular/core";
import { SuiToast } from "./toast";
import { IToastOptions } from "../interfaces/toast-options";

export class SuiCustomTemplateToast<T> extends SuiToast {
    private _classNames: string;
    private _progressBarClassNames: string;

    public get classNames(): string {
        return this._classNames.concat(this.clickCallback ? ` clickable` : ``);
    }

    public get progressBarClassNames(): string {
        return this._progressBarClassNames;
    }

    constructor(public template: TemplateRef<T>,
        public context: T,
        toastOptions?: IToastOptions) {
        super(toastOptions);
        this._classNames = (toastOptions && toastOptions.classNames) ? toastOptions.classNames : ``;
        this._progressBarClassNames = (toastOptions && toastOptions.progressBarClassNames) ? toastOptions.progressBarClassNames : ``;
    }
}
