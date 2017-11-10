import { SuiToast } from "./toast";
import { SuiToastTransition } from "./toast-transition";
import { SuiToastPosition } from "./toast-position";

export class SuiToastOptions {
    transition: SuiToastTransition;
    insertOnTop: boolean;
    position: SuiToastPosition;
    clickCallback: ((toast: SuiToast) => void) | null;
    hasCloseIcon: boolean;
    timeout: number;
    classNames: string;
    progressBarClassNames: string;

    public static Default(): SuiToastOptions {
        return {
            transition: SuiToastTransition.Default(),
            insertOnTop: false,
            position: SuiToastPosition.BottomFullWidth,
            clickCallback: null,
            hasCloseIcon: true,
            timeout: 0,
            classNames: ``,
            progressBarClassNames: ``
        } as SuiToastOptions;
    }
}