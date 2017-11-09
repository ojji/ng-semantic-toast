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

export const SuiToastTransitionTypes = {
    Fade: 'fade',
    FadeUp: 'fade up',
    FadeDown: 'fade down',
    FadeLeft: 'fade left',
    FadeRight: 'fade right',
    HorizontalFlip: 'horizontal flip',
    VerticalFlip: 'vertical flip',
    Drop: 'drop',
    FlyLeft: 'fly left',
    FlyRight: 'fly right',
    FlyUp: 'fly up',
    FlyDown: 'fly down',
    Browse: 'browse',
    BrowseRight: 'browse right',
    SlideLeft: 'slide left',
    SlideRight: 'slide right',
    SlideUp: 'slide up',
    SlideDown: 'slide down'
}