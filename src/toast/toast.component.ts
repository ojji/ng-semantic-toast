import {
    Component,
    ViewContainerRef,
    TemplateRef,
    OnInit,
    OnDestroy,
    Input,
    ViewChild,
    Output,
    EventEmitter,
    Renderer2,
    ElementRef,
    ChangeDetectorRef
} from "@angular/core";

import { SuiToast } from "../classes/toast";
import { SuiCustomTemplateToast } from "../classes/custom-template-toast";
import { SuiMessageToast } from "../classes/message-toast";

import { SuiTransition, TransitionController, Transition, TransitionDirection } from "ng2-semantic-ui";
import { Util } from "../classes/util";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "sui-toast",
    templateUrl: "./toast.component.html",
    styleUrls: ["./toast.component.css"]
})
export class SuiToastComponent extends SuiTransition implements OnInit, OnDestroy {

    private _transitionController: TransitionController;
    private _progressAnimationHandle: any;
    private _progressTimeoutSubcription: Subscription;
    private _toastCloseSubcription: Subscription;

    @Input()
    public toast: SuiToast;

    @Output()
    public onToastClosed: EventEmitter<SuiToast> = new EventEmitter<SuiToast>();

    @ViewChild("contentContainer", { read: ViewContainerRef })
    public contentContainer: ViewContainerRef;

    @ViewChild("defaultContentTemplate")
    public defaultContentTemplate: TemplateRef<any>;

    public get multipleMessages(): boolean {
        return this.toast instanceof SuiMessageToast && Array.isArray(this.toast.message);
    }

    constructor(private renderer: Renderer2, private element: ElementRef, private changeDetector: ChangeDetectorRef) {
        super(renderer, element, changeDetector);
        this._transitionController = new TransitionController(true);
        this.setTransitionController(this._transitionController);
    }

    public ngOnInit(): void {
        if (this.toast instanceof SuiMessageToast) {
            this.contentContainer.createEmbeddedView(this.defaultContentTemplate);
        } else if (this.toast instanceof SuiCustomTemplateToast) {
            this.contentContainer.createEmbeddedView(this.toast.template, { $implicit: this.toast.context, toast: this.toast });
        }

        if (this.toast.transition.transitionInType) {
            this._transitionController.animate(
                new Transition(
                    this.toast.transition.transitionInType,
                    this.toast.transition.transitionInDuration,
                    TransitionDirection.In));
        }

        if (this.toast.timeout > 0) {
            this.toast.setStart(new Date().getTime());
            this._progressAnimationHandle = Util.Animation.requestInterval((time: number) => {
                this.updateProgress(time);
            });
            this._progressTimeoutSubcription = this.toast.onTimeout.subscribe(t => this.removeToast());
        }

        this._toastCloseSubcription = this.toast.onClose.subscribe(t => this.removeToast());
    }

    public updateProgress(time: number): void {
        if (this.toast.timeout > 0) {
            this.toast.updateProgress(time);
        }
    }

    public removeToast(): void {
        if (this.toast.timeout > 0) {
            Util.Animation.cancelInterval(this._progressAnimationHandle);
        }

        if (this.toast.transition.transitionOutType) {
            this._transitionController.animate(
                new Transition(
                    this.toast.transition.transitionOutType,
                    this.toast.transition.transitionOutDuration,
                    TransitionDirection.Out,
                    () => { this.onToastClosed.emit(this.toast); }
                ));
        } else {
            this.onToastClosed.emit(this.toast);
        }
    }

    public onClicked(): void {
        if (this.toast.clickCallback) {
            this.toast.clickCallback.call(this, this.toast);
        }
    }

    public ngOnDestroy(): void {
        if (this._progressTimeoutSubcription) {
            this._progressTimeoutSubcription.unsubscribe();
        }
        if (this._toastCloseSubcription) {
            this._toastCloseSubcription.unsubscribe();
        }
    }
}
