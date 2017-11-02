export class SuiToastTransition {
    public static Default(): SuiToastTransition {
        return new SuiToastTransition("fade", 400, "fade", 400);
    }

    constructor(public transitionInType: string = "fade",
                public transitionInDuration: number = 400,
                public transitionOutType: string = transitionInType,
                public transitionOutDuration: number = transitionInDuration) {
    }
}
