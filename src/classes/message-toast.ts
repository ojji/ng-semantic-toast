import { SuiToast } from "./toast";
import { IToastOptions } from "./toast-options";

export class SuiToastType {
    public static Success(): SuiToastType {
        return new SuiToastType("success");
    }

    public static Info(): SuiToastType {
        return new SuiToastType("info", "blue");
    }

    public static Warning(): SuiToastType {
        return new SuiToastType("warning");
    }

    public static Error(): SuiToastType {
        return new SuiToastType("error");
    }

    public static Custom(customClassName: string, barClassName: string = customClassName): SuiToastType {
        return new SuiToastType(customClassName, barClassName);
    }

    constructor(public className: string, public barClassName: string = className) { }
}

export class SuiMessageToast extends SuiToast {

    public get classNames(): string {
        return this.type.className
        .concat(this.hasIcon ? ` icon` : ``)
        .concat(this.clickCallback ? ` clickable` : ``);
    }

    public get progressBarClassNames(): string {
        return this.type.barClassName;
    }

    public get hasIcon(): boolean {
        return (this.icon !== "");
    }

    constructor(public header: string,
        public message: string | string[],
        public type: SuiToastType,
        public icon: string = ``,
        toastOptions: IToastOptions
    ) {
        super(toastOptions);
    }
}
