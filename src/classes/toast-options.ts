import { SuiToast } from "./toast";
import { SuiToastTransition } from "./toast-transition";
import { SuiToastPosition } from "./toast-position";

export interface IToastOptions {
    transition: SuiToastTransition;
    insertOnTop: boolean;
    position: SuiToastPosition;
    clickCallback: ((toast: SuiToast) => void) | null;
    hasCloseIcon: boolean;
    timeout: number;
    classNames: string;
    progressBarClassNames: string;
}

export const SuiDefaultToastOptions: IToastOptions = {
    transition: SuiToastTransition.Default(),
    insertOnTop: false,
    position: SuiToastPosition.BottomFullWidth,
    clickCallback: null,
    hasCloseIcon: true,
    timeout: 0,
    classNames: ``,
    progressBarClassNames: ``
};
