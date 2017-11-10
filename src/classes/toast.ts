import { SuiToastPosition } from "./toast-position";
import { IToastOptions } from "../interfaces/toast-options";
import { SuiToastOptions } from "./toast-options";
import { SuiToastTransition } from "./toast-transition";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/share";

export abstract class SuiToast {
    private _onTimeoutSubject: Subject<SuiToast> = new Subject<SuiToast>();
    private _onCloseSubject: Subject<SuiToast> = new Subject<SuiToast>();
    private _start: number;
    private _progress = 100;

    private _timeout: number;
    private _hasCloseIcon: boolean;
    private _clickCallback: ((toast: SuiToast) => void) | null;
    private _position: SuiToastPosition;
    private _insertOnTop: boolean;
    private _transition: SuiToastTransition;

    constructor(toastOptions?: IToastOptions) {
        this.setupOptions(toastOptions);
    }

    private setupOptions(options?: IToastOptions): void {
        let opts = { ...SuiToastOptions.Default(), ...options };
        this._timeout = opts.timeout;
        this._hasCloseIcon = opts.hasCloseIcon;
        this._clickCallback = opts.clickCallback;
        this._position = opts.position;
        this._insertOnTop = opts.insertOnTop;
        this._transition = opts.transition;
    }

    public abstract get classNames(): string;
    public abstract get progressBarClassNames(): string;

    public get timeout(): number {
        return this._timeout;
    }

    public get hasCloseIcon(): boolean {
        return this._hasCloseIcon;
    }

    public get clickCallback(): ((toast: SuiToast) => void) | null {
        return this._clickCallback;
    }

    public get position(): SuiToastPosition {
        return this._position;
    }
    public get insertOnTop(): boolean {
        return this._insertOnTop;
    }

    public get transition(): SuiToastTransition {
        return this._transition;
    }

    public get progress(): number {
        return this._progress;
    }

    public get onTimeout(): Observable<SuiToast> {
        return this._onTimeoutSubject.asObservable().share();
    }

    public get onClose(): Observable<SuiToast> {
        return this._onCloseSubject.asObservable().share();
    }

    public setStart(time: number): void {
        this._start = time;
    }

    public updateProgress(currentTime: number): void {
        if (this._progress > 0) {
            this._progress = Math.round((1 - ((currentTime - this._start) / this.timeout)) * 100);
            if (this._progress <= 0) {
                this._onTimeoutSubject.next(this);
                this._onTimeoutSubject.complete();
            }
        }
    }

    public close(): void {
        this._onCloseSubject.next(this);
        this._onCloseSubject.complete();
    }
}
