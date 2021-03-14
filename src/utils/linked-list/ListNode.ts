export default class ListNode<T> {
	private _next: ListNode<T>;
	private _prev: ListNode<T>;
	private _data: T;

	public constructor(data: T) {
		this.data = data;
	}

	get next(): ListNode<T> {
		return this._next;
	}

	set next(next: ListNode<T>) {
		this._next = next;
	}

	get prev(): ListNode<T> {
		return this._prev;
	}

	set prev(prev: ListNode<T>) {
		this._prev = prev;
	}

	get data():T {
		return this._data;
	}

	set data(data: T) {
		this._data = data;
	}
}