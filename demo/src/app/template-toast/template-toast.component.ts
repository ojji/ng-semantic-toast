import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Ticket } from './ticket';
import {
    SuiToastService,
    SuiToastType,
    SuiToastPosition,
    SuiCustomTemplateToast,
    SuiMessageToast,
    IToastOptions,
    SuiToastTransition,
    SuiToastTransitionTypes
} from 'ng-semantic-toast';

export interface IUndoTicketContext {
    cart: TemplateToastComponent;
    itemRemoved: Ticket;
    undo: (cart: TemplateToastComponent, ticket: Ticket) => void;
}

@Component({
    selector: 'demo-template-toast',
    templateUrl: './template-toast.component.html',
    styleUrls: ['./template-toast.component.css']
})
export class TemplateToastComponent implements OnInit {
    $bladerunner = `Thirty years after the events of the first film, a new blade runner, LAPD Officer K (Ryan Gosling),
    unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery
    leads him on a quest to find Rick Deckard (Harrison Ford), a former LAPD blade runner who has been missing for 30 years.`;

    $jigsaw = `Thirteen years ago on Halloween weekend--SAW and the character of JIGSAW introduced the world to a new face of horror.
    For seven straight years "If it's Halloween it must be SAW" was a holiday tradition. This October 27, Lionsgate and Twisted Pictures
    proudly present JIGSAW! After a series of murders bearing all the markings of the Jigsaw killer, law enforcement find themselves
    chasing the ghost of a man dead for over a decade and embroiled in a new game that's only just begun. Is John Kramer back from
    the dead to remind the world to be grateful for the gift of life? Or is this a trap set by a killer with designs of their own?`;

    private _tickets: Ticket[] = [
        new Ticket('Blade Runner 2049',
            'assets/blade-runner-2049-poster.jpg',
            'CineMAX', 'IMAX Auditorium', new Date(2017, 10, 1, 20, 0), 10,
            this.$bladerunner,
            ['Limited', 'Premier'], false),
        new Ticket('Blade Runner 2049',
            'assets/blade-runner-2049-poster.jpg',
            'CineMAX', 'IMAX Auditorium', new Date(2017, 10, 1, 20, 0), 10,
            this.$bladerunner,
            ['Limited', 'Premier'], false),
        new Ticket('Jigsaw',
            'assets/jigsaw-poster.jpg',
            'CineMAX', 'Hitchcock Auditorium', new Date(2017, 10, 26, 19, 30), 7,
            this.$jigsaw, ['Premier', '18+'], false),
        new Ticket('Jigsaw',
            'assets/jigsaw-poster.jpg',
            'CineMAX', 'Hitchcock Auditorium', new Date(2017, 10, 26, 19, 30), 7,
            this.$jigsaw, ['Premier', '18+'], false),
    ];

    public get tickets(): Ticket[] {
        return this._tickets.filter(t => t.deleted === false);
    }

    public get ticketsTotal(): number {
        return this.tickets.map(t => t.cost)
            .reduce((sum, cost) => {
                return sum += cost;
            }, 0);
    }

    @ViewChild('undoTicketTemplate')
    public undoTicketTemplate: TemplateRef<any>;

    constructor(private _toastService: SuiToastService) { }

    ngOnInit() {
    }

    public removeTicket(ticket: Ticket) {
        if (this.tickets.indexOf(ticket) === 1) {
            const options: IToastOptions = {
                timeout: 5000,
                hasCloseIcon: false,
                clickCallback: (t: SuiMessageToast) => { t.close(); },     
                transition: new SuiToastTransition(
                    SuiToastTransitionTypes.FlyLeft, 225,
                    SuiToastTransitionTypes.FlyLeft, 195)
            };

            const messageToast = new SuiMessageToast(
                'We are sorry.',
                'Our ticketing system is overwhelmed. Please, try again later.',
                SuiToastType.Error(),
                'frown',
                options
            );
            this._toastService.addToast(messageToast);
        } else {
            ticket.deleted = true;
            const undoTicketContext: IUndoTicketContext = {
                cart: this,
                itemRemoved: ticket,
                undo: (c, t) => {
                    c.undo(t);
                }
            };

            const options: IToastOptions = {
                classNames: 'undo',
                hasCloseIcon: false,
                clickCallback: (t: SuiCustomTemplateToast<IUndoTicketContext>) => { t.close(); },
                transition: new SuiToastTransition(
                    SuiToastTransitionTypes.FlyLeft, 225,
                    SuiToastTransitionTypes.FlyLeft, 195)
            };

            const toast = new SuiCustomTemplateToast<IUndoTicketContext>(
                this.undoTicketTemplate,
                undoTicketContext,
                options
            );

            this._toastService.addToast(toast);
        }
    }

    public undo(ticket: Ticket) {
        ticket.deleted = false;
    }
}
