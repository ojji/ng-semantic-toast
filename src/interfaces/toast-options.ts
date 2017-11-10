import { SuiToast } from "../classes/toast";
import { SuiToastTransition } from "../classes/toast-transition";
import { SuiToastPosition } from "../classes/toast-position";

export interface IToastOptions {
    transition?: SuiToastTransition;
    insertOnTop?: boolean;
    position?: SuiToastPosition;
    clickCallback?: ((toast: SuiToast) => void);
    hasCloseIcon?: boolean;
    timeout?: number;
    classNames?: string;
    progressBarClassNames?: string;
}
