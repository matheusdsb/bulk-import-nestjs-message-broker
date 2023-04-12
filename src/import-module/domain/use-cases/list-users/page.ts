export class Page<T> {
  private _items: T[];
  private _hasNextPage: boolean;
  private _totalItems: number;
  private _pageSize: number;

  constructor(items: T[], totalItems: number, pageSize: number) {
    this._items = items;
    this._totalItems = totalItems;
    this._pageSize = pageSize;
    this._hasNextPage = totalItems > pageSize;
  }

  get items(): T[] {
    return this._items;
  }

  get totalItems(): number {
    return this._totalItems;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
  }
}
