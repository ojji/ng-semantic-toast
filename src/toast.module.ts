import { NgModule, APP_BOOTSTRAP_LISTENER, ComponentRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiToastContainerComponent } from "./toast-container/toast-container.component";
import { SuiToastService } from "./services/toast.service";
import { SuiTransitionModule } from "ng2-semantic-ui";
import { SuiToastComponent } from "./toast/toast.component";

export function bootstrapToastService(service: SuiToastService) {
    // todo: change this when https://github.com/angular/angular/issues/14485 is resolved
    const toastInitializer = (component: ComponentRef<any>) => {
        service.registerRootComponent(component);
    };
    return toastInitializer;
}

@NgModule({
    imports: [CommonModule, SuiTransitionModule],
    declarations: [SuiToastContainerComponent, SuiToastComponent],
    entryComponents: [SuiToastContainerComponent],
    providers: [
        SuiToastService,
        {
            provide: APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: bootstrapToastService,
            deps: [SuiToastService]
        }
    ]
})
export class SuiToastModule { }
