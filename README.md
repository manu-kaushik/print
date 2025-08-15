# print

Print function for JavaScript

<br />

### Usage

```javascript
const print = require("@bitterbyter/print");

print(<data>, <type>);
```

<br />

#### Examples

##### default

```javascript
const print = require("@bitterbyter/print");

print("Hello, World!");
```

##### warn

```javascript
const print = require("@bitterbyter/print");

let x = 0;

print(`Value of x is ${x}`, "debug");
```

<br />

#### Types

- `count`
- `countReset`
- `debug`
- `dir`
- `dirxml`
- `error`
- `info`
- `table`
- `warn`

> Not specifying any type, defaults to `log`.
