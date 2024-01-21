import { LinkedList, Node } from "./linkedlist.js";


class HashMap {
    constructor() {
        this.buckets = new Array(16);
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

    set(key, value) {
        let index = this.hash(key);
        if (this.buckets[index] == null) {
            let LL = new LinkedList();
            LL.append(key, value)
            this.buckets[index] = LL;
            this.capacity++;
        } else {
            if (this.buckets[index].contains(key)) {
                let current = this.buckets[index].head();
                while (current) {
                    if (current.key == key) {
                        current.value = value;
                        break;
                    }
                    current = current.next;

                }
            } else {
                this.buckets[index].append(key, value);
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
            if (copy[i]) {
                let current = copy[i].head();
                while (current) {
                    let index = this.hash(current.key);
                    if (this.buckets[index] == null) {
                        let LL = new LinkedList();
                        LL.append(current.key, current.value)
                        this.buckets[index] = LL;
                    } else {
                        this.buckets[index].append(current.key, current.value);
                    }
                    current = current.next;
                }
            }
        }
    }

    get(key) {
        let index = this.hash(key);
        let LL = this.buckets[index];
        return LL.get(key);
    }

    has(key) {
        let index = this.hash(key);
        let LL = this.buckets[index];
        return LL.contains(key);
    }

    remove(key) {
        if (this.has(key)) {
            let index = this.hash(key);
            let LL = this.buckets[index];
            LL.remove(key);
            this.capacity--;
            return true;
        } return false;
    }

   
    length() {
        return this.capacity;
    }

    clear() {
        this.buckets = new Array(16);
        this.capacity = 0;
    }

    keys() {
        let keys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let current = this.buckets[i].head();
                while (current) {
                    keys.push(current.key);
                    current = current.next;
                }
            }
        }
        return keys;
    }

    values() {
        let values = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let current = this.buckets[i].head();
                while (current) {
                    values.push(current.value);
                    current = current.next;
                }
            }
        }
        return values;
    }

    entries() {
        let entries = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let current = this.buckets[i].head();
                while (current) {
                    let pair = [];
                    pair.push(current.key);
                    pair.push(current.value);
                    entries.push(pair);
                    current = current.next;
                }
            }
        }
        return entries;
    }
}

let hashmap = new HashMap();
hashmap.set("age", "29");
hashmap.set("johnny", "29");
hashmap.set("timberwolf", "100");
hashmap.set("hello", "29");
hashmap.set("test", "29");
hashmap.set("johnny", "28");
hashmap.set("johnny", "30");

console.log(hashmap.buckets);
console.log(hashmap.get("test"));
console.log(hashmap.get("timberwolf"));
console.log(hashmap.has("test"));
console.log(hashmap.capacity)
console.log(hashmap.buckets);
console.log(hashmap.remove("johnny"));
console.log(hashmap.capacity)
console.log(hashmap.buckets);
console.log(hashmap.keys());
console.log(hashmap.values());
console.log(hashmap.entries());
hashmap.set("jimbo", "onepiece");
console.log(hashmap.entries());
