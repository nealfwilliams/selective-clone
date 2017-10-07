## Selective Clone
This library is a utility to help update nested state on an object (or array) without mutating the original object.  
It was initially created for use with React/Redux; however it can be useful in any situation when an object needs 
to be transformed into a new object without mutating the original.  

This library works similarly to [dot-prop-immutable](https://github.com/debitoor/dot-prop-immutable).

## Installation
This package is available via npm.
```
npm install --save selective-clone
yarn add selective-clone
```

## Usage
Selective clone essentially makes a clone of an object with specified properties deep copied.  
It takes an object as its first argument, and an arbitrary number of dot paths as subsequent arguments.  
A new object will be made for any nested object on any of the passed dot paths, or subpaths thereof.  
Any nested object not referenced on a passed dot path will reference the object on the original object 
(similar to a shallow clone).

#### Example: 
```javascript
import selectiveClone from 'selective-clone';

let obj = {
  nested1: {
    prop1: 'prop1'
  },
  nested2: {
    prop2: 'prop2'
  }
}

let copy1 = selectiveClone(obj, 'nested1');
obj.nested1 === copy1.nested1 // false
obj.nested2 === copy1.nested3 // true

let copy2 = selectiveClone(obj, 'nested1.prop1');
obj.nested1 === copy1.nested1 // false
obj.nested2 === copy1.nested3 // true

let copy3 = selectiveClone(obj, 'nested', 'nested2');
obj.nested1 === copy1.nested1 // false
obj.nested2 === copy1.nested3 // false
```

## Rationale
This approach is advantageous for a few reasons.
1. Any type object transformation (set, delete, etc.) can be safely done using a single API function, which is 
preferrable to remembering multiple function signatures.
2. After an object is cloned, the cloned properties on the new object can be safely mutated using any standard Javascript 
(or utility library) method, even if that method mutates its argument (eg. Array.prototype.push).
