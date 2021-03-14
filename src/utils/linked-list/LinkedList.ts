import ListNode from "./ListNode";

export default class LinkedList<T> {
	private _head: ListNode<T>;
	private _count: number = 0;

	get head(): ListNode<T> {
		return this._head;
	}

	set head(head: ListNode<T>) {
		this._head = head;
	}

	get count(): number {
		return this._count;
	}

	set count(count: number) {
		this._count = count;
	}

	public isEmpty() {
		return this.count == 0;
	}

	public find(index: number) {
		if(index >= this.count) throw 'Index out of bounds';
		
		let count = 0;
		let cur = this.head;

		while(count < index) {
			cur = cur.next;
			count++;
		}

		return cur;
	}

	public insert(data: T) {
		let listNode = new ListNode<T>(data);
		if(this.head == null) {
			this.head = listNode;
			this.head.next = null;
			this.count++;
			return;
		}

		let cur = this.head;
		while(cur.next != null) {
			cur = cur.next;
		}

		listNode.prev = cur;
		cur.next = listNode;

		this.count++;
	}

	public insertAfter(index: number, data: T) {
		let refNode = this.find(index);
		let listNode = new ListNode<T>(data);
		
		if(refNode.next != null) refNode.next.prev = listNode;
		listNode.next = refNode.next;
		refNode.next = listNode;
		listNode.prev = refNode;

		this.count++;
	}

	public insertBefore(index: number, data: T) {
		let refNode = this.find(index);
		let listNode = new ListNode<T>(data);
		
		if(refNode.prev != null) refNode.prev.next = listNode;
		listNode.prev = refNode.prev;
		refNode.prev = listNode;
		listNode.next = refNode;

		this.count++;
	}

	public delete(index: number) {
		let toDelete = this.find(index);

		if(toDelete.next != null) toDelete.next.prev = toDelete.prev;
		if(toDelete.prev != null) toDelete.prev.next = toDelete.next;

		if(index == 0) this.head = toDelete.next;
		this.count--;

		return toDelete.data;
	}

	public display() {
		let cur = this.head;

		while(cur != null) {
			console.log(cur.data);
			
			cur = cur.next;
		}
	}
}