export class Ticket {
    constructor(public title: string,
                public poster: string,
                public theater: string,
                public auditorium: string,
                public sessionTime: Date,
                public cost: number,
                public description: string,
                public labels?: string[],
                public deleted: boolean = false
            ) {
    }

    public hasLabel(label: string): boolean {
        return (this.labels) &&
            this.labels.some(l => l.toLowerCase() === label.toLowerCase());
    }
}
