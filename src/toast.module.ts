import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiToastContainerComponent } from "./toast-container/toast-container.component";
import { SuiToastService } from "./services/toast.service";
import { SuiTransitionModule } from "ng2-semantic-ui";
import { SuiToastComponent } from "./toast/toast.component";

@NgModule({
    imports: [CommonModule, SuiTransitionModule],
    declarations: [SuiToastContainerComponent, SuiToastComponent],
    entryComponents: [SuiToastContainerComponent],
    providers: [SuiToastService]
})
export class SuiToastModule { }
