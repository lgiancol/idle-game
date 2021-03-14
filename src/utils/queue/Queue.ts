import LinkedList from "../linked-list/LinkedList";

export default class Queue<T> extends LinkedList<T> {
	public enqueue(data: T) {
		if(this.count == 0) {
			this.insert(data);
		} else {
			this.insertAfter(this.count - 1, data);
		}
	}

	public dequeue() {
		if(this.isEmpty()) return null;
		return this.delete(0);
	}

	public peek() {
		if(this.isEmpty()) return null;
		return this.find(0).data;
	}
}