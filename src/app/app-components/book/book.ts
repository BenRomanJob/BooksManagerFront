
export enum BookType {
    ActionAndAdventure,
    Classics,
    ComicBook,
    GraphicNovel,
    Detective,
    Mystery,
    Fantasy,
    Historical,
    Fiction,
    Horror,
    Literary
}

export class Book {
    public id: number;
    public type: BookType;
    public price: number;
    public pages: number;
    public name: string;
    public isActive: boolean;
}