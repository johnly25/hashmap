class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.root = null;
    }

    append(key,value) {
        let node = new Node(key,value);
        if (this.root == null) {
            this.root = node;
        } else {
            let current = this.root;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
    }

    prepend(key, value) {
        let node = new Node(key,value);
        if (this.root == null) {
            this.root = node;
        } else {
            node.next = this.root;
            this.root = node;
        }
    }
    // size returns the total number of nodes in the list
    size() {
        let size = 0;
        if (this.root == null) {
            return size;
        } else {
            let current = this.root;
            while (current != null) {
                current = current.next;
                size++;
            }
            return size;
        }

    }
    // head returns the first node in the list
    head() {
        return this.root;
    }

    // tail returns the last node in the list
    tail() {
        if (this.root == null) {
            return this.root;
        } else {
            let current = this.root;
            while (current.next) {
                current = current.next;
            }
            return current;
        }
    }
    remove(key) {
        let current = this.root;
        if(current.key == key) {
            this.root = current.next;
        } else {
            while(current.next) {
                if(current.next.key == key) {
                    current.next = current.next.next;
                }
               current = current.next;
            }
        }
    }

    // at(index) returns the node at the given index
    at(index) {
        if (index > 0) {
            return 'not valid number'
        }
        if (index > this.size() - 1) {
            return 'index is bigger than size'
        }
        let current = this.root;
        for (let i = 0; i <= index; i++) {
            current = current.next;
        }
        return current;
    }

    // pop removes the last element from the list
    pop() {
        let current = this.root;
        while (current.next.next) {
            current = current.next;
        }
        current.next = null;
    }

    // contains(value) returns true if the passed in value is in the list and otherwise returns false.
    contains(key) {
        let current = this.root;
        while (current) {
            console.log(current.key);
            if (current.key == key) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    get(key) {
        let current = this.root;
        while (current) {
            if (current.key == key) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }

    // find(value) returns the index of the node containing value, or null if not found.
    find(value) {
        let current = this.root
        let index = 0;
        while (current.next) {
            if(current.value == value) {
                return index;
            }
            current = current.next;
            index++;
        }
        return null;
    }


    // removeAt(index) that removes the node at the given index.
    removeAt(index) {
        if(index == 0) {
            this.root = this.root.next
        } else {
            let current = this.root;
            let currIndex = 0;
            while(currIndex < index - 1) {
                current = current.next;
                currIndex++;
            }
            current.next = current.next.next;
         }
    }

    toString() {
        let current = this.root;
        let string = "";
        while (current) {
            string += "(" + current.key + ", " + current.value + ") -> ";
            current = current.next;
        }
        string += "null";
        return string;
    }
}

export {LinkedList, Node};