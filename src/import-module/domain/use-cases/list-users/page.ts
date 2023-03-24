export class Page<T> {
  private _items: T[];
  private _hasNextPage: boolean;

  constructor(items: T[], totalItems: number, pageSize: number) {
    this._items = items;
    this._hasNextPage = totalItems > pageSize;
  }

  get items(): T[] {
    return this._items;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
  }
}
