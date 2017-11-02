import {
    Injectable,
    ApplicationRef,
    ComponentFactoryResolver,
    ViewContainerRef,
    ReflectiveInjector,
    ComponentRef,
    EmbeddedViewRef
} from "@angular/core";
import { SuiToastContainerComponent } from "../toast-container/toast-container.component";
import { SuiToast } from "../classes/toast";
import { SuiToastPosition } from "../classes/toast-position";

@Injectable()
export class SuiToastService {

    private _rootViewContainerRef: ViewContainerRef;
    private _toastContainers: ComponentRef<SuiToastContainerComponent>[] = [];

    constructor(private _appRef: ApplicationRef,
                private _factoryResolver: ComponentFactoryResolver) {
    }

    public setRootViewContainerRef(rootViewContainerRef: ViewContainerRef): void {
        this._rootViewContainerRef = rootViewContainerRef;
    }

    private createToastContainerComponent(): ComponentRef<SuiToastContainerComponent> {
        if (!this._rootViewContainerRef) {
            throw Error("You have to set the root view container first.");
        }
        const toastComponentFactory: any = this._factoryResolver.resolveComponentFactory(SuiToastContainerComponent);

        const providers: any = ReflectiveInjector.resolve([]);
        const injector: any = ReflectiveInjector.fromResolvedProviders(providers, this._rootViewContainerRef.parentInjector);

        return toastComponentFactory.create(injector);
    }

    private getComponentRootNode(component: ComponentRef<any>): HTMLElement {
        return (component.hostView as EmbeddedViewRef<any>).rootNodes[0];
    }

    private getToastContainerWithPosition(position: SuiToastPosition): ComponentRef<SuiToastContainerComponent> | false {
        const index: number = this._toastContainers.findIndex(tc => tc.instance.position === position);
        return index === -1 ? false : this._toastContainers[index];
    }

    public addToast(toast: SuiToast): void {
        let toastContainer: ComponentRef<SuiToastContainerComponent> | false = this.getToastContainerWithPosition(toast.position);
        if (!toastContainer) {
            // create the component
            toastContainer = this.createToastContainerComponent();
            // register change detection
            this._appRef.attachView(toastContainer.hostView);
            // append to the root view element
            const toastComponentNode: any = this.getComponentRootNode(toastContainer);
            const appComponentNode: any = this.getComponentRootNode(this._appRef.components[0]);
            appComponentNode.appendChild(toastComponentNode);
            // set position and add to the containers array
            toastContainer.instance.position = toast.position;
            this._toastContainers.push(toastContainer);
        }

        toastContainer.instance.addToast(toast);
    }
}
