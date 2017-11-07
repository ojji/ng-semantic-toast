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

    private _rootComponent: ComponentRef<any>;
    private _rootViewContainerRef: ViewContainerRef;
    private _toastContainers: ComponentRef<SuiToastContainerComponent>[] = [];

    constructor(private _appRef: ApplicationRef,
                private _factoryResolver: ComponentFactoryResolver) {
    }

    public setRootViewContainerRef(rootViewContainerRef: ViewContainerRef): void {
        this._rootViewContainerRef = rootViewContainerRef;
    }

    public registerRootComponent(root: ComponentRef<any>) {
        // this method is called by the APP_BOOTSTRAP_INITIALIZER
        // since this is the time when we can be sure that the root component has been initialized
        // now is the right time to add the toast components to the view
        this._rootComponent = root;
        this._toastContainers.forEach(tc => {
            this.insertContainer(root, tc);
        });
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

    private insertContainer(root: ComponentRef<any>, toastContainer: ComponentRef<SuiToastContainerComponent>): void {
        // append container next to the root component
        const toastComponentNode = this.getComponentRootNode(toastContainer);
        const appComponentNode = this.getComponentRootNode(root);
        appComponentNode.appendChild(toastComponentNode);
        // register change detection
        this._appRef.attachView(toastContainer.hostView);
        toastContainer.changeDetectorRef.detectChanges();
    }

    public addToast(toast: SuiToast): void {
        let toastContainer: ComponentRef<SuiToastContainerComponent> | false = this.getToastContainerWithPosition(toast.position);
        if (!toastContainer) {
            // create the component and push to the containers collection
            toastContainer = this.createToastContainerComponent();
            toastContainer.instance.position = toast.position;
            if (this._rootComponent) {
                this.insertContainer(this._rootComponent, toastContainer);
            }
            this._toastContainers.push(toastContainer);
        }

        toastContainer.instance.addToast(toast);
    }
}
