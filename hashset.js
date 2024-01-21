class Node {
    constructor(key) {
        this.key = key;
        this.next = null;
    }
}

class HashSet {
    constructor() {
        this.buckets = new Array(4);
        this.load_factor = 0.75;
        this.capacity = 0;
    }

    stringToNumber(string) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }
        return hashCode % this.buckets.length;
    }

    hash(value) {
        return this.stringToNumber(value);
    }

    set(key) {
        let index = this.hash(key);
        if (this.buckets[index] == null) {
            this.buckets[index] = new Node(key);
            this.capacity++;
        } else {
            let current = this.buckets[index];
            let contains = false;
            if (current.next != null) {
                while (current.next) {
                    if (current.key == key) {
                        contains = true;
                    }
                    current = current.next
                }
            } else {
                if (current.key == key) {
                    contains = true;
                }
            }
            if (!contains) {
                current.next = new Node(key);
                this.capacity++;
            }

        }

        if (this.capacity / this.buckets.length > this.load_factor) {
            this.resize();
        }

    }

    resize() {
        let copy = [...this.buckets];
        this.buckets = new Array(this.buckets.length * 2);
        for (let i = 0; i < copy.length; i++) {
            let current = copy[i];
            while (current) {
                let index = this.hash(current.key);
                if (this.buckets[index]) {
                    let current2 = this.buckets[index];
                    while (current2.next) {
                        current2 = current2.next;
                    }
                    current2.next = new Node(current.key);
                } else {
                    this.buckets[index] = new Node(current.key);
                }
                current = current.next;
            }
        }
    }

    // has takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    has(key) {
        let index = this.hash(key);
        let current = this.buckets[index];
        while (current) {
            if (current.key == key) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
    // remove takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    remove(key) {
        let index = this.hash(key);
        let current = this.buckets[index];
        if(current.key == key) {
            this.buckets[index] = current.next;
        } else {
            while(current.next) {
                if(current.next.key == key) {
                    current.next = current.next.next;
                    return true;
                }
                current = current.next;
            }
        }
    
        return false;
    }
    // length returns the number of stored keys in the hash map.
    length() {
        return this.capacity;
    }

    // clear removes all entries in the hash map.
    clear() {
        this.buckets = new Array(16);
        this.capacity = 0;
    }

    // keys returns an array containing all the keys inside the hash map.
    keys() {
        let keys = [];
        for(let i = 0 ; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            if(current) {
                while(current) {
                    keys.push(current.key);
                    current = current.next;
                }
            }
        }
        return keys;
    }
}

let hashset = new HashSet();
hashset.set("age");
hashset.set("johnny");
hashset.set("johnny");
hashset.set("albert");
hashset.set("albert");
hashset.set("tony");
hashset.set("joe");
hashset.set("jordan");
hashset.set("pineappple");

console.log(hashset.buckets);
console.log(hashset.capacity);
console.log(hashset.has("tony"));
console.log(hashset.has("coi"));
console.log(hashset.has("pineappple"));
console.log(hashset.keys());
console.log(hashset.remove("pineappple"));
console.log(hashset.remove("tony"));
console.log(hashset.remove("tony"));
console.log(hashset.keys());