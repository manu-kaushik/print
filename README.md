# print

A lightweight logger with automatic timestamps, smart data type detection, and timer management.

## Features

- **Named exports**: Clean `import { log, success, error }` syntax
- **Auto-formatting**: Detects data types and formats appropriately
- **Timer management**: Built-in timing with automatic duration logging
- **Environment awareness**: Debug logs skip in production
- **Timestamps**: Optional timestamps on all logs
- **TypeScript support**: Full TypeScript definitions included
- **ES Module support**: Works in React/Next.js and Node.js

## Installation

```bash
npm install @bitterbyter/print
```

## Quick Start

### ES Modules (React/Next.js)

```javascript
import {
  log,
  success,
  error,
  info,
  warn,
  debug,
  startTimer,
  endTimer,
  configure,
} from "@bitterbyter/print";

// Configure
configure({
  environment: "development",
  timestamps: true,
});

// Basic logging
success("Operation completed!");
error("Something went wrong");
info("Here is some information");
warn("This might be an issue");
debug("Debug information"); // Only logs in development

// Auto-formatting
log("Hello World"); // Simple string
info({ name: "John" }); // Auto-formats as JSON
debug([1, 2, 3]); // Auto-formats as array
error(new Error("Oops")); // Auto-formats with stack trace

// Timer usage
startTimer("api-call");
// ... API call
endTimer("api-call"); // Auto-prints duration
```

### CommonJS (Node.js)

```javascript
const {
  log,
  success,
  error,
  info,
  warn,
  debug,
  startTimer,
  endTimer,
  configure,
} = require("@bitterbyter/print");

// Same usage as ES modules
configure({ environment: "development", timestamps: true });
success("Hello from Node.js!");
```

## API Reference

### Core Logging

- `log(data)` - Basic logging
- `success(data)` - Success messages
- `error(data)` - Error messages
- `info(data)` - Information messages
- `warn(data)` - Warning messages
- `debug(data)` - Debug messages (development only)

### Data Formatting

- `table(data)` - Display data as table
- `count(label)` - Count occurrences
- `countReset(label)` - Reset counter
- `dir(data)` - Display object properties
- `dirxml(data)` - Display XML/HTML structure

### Timing

- `startTimer(label)` - Start timer
- `endTimer(label)` - End timer and log duration

### Configuration

- `configure(options)` - Configure logger settings

## Configuration Options

```javascript
configure({
  environment: "development", // 'development' | 'production'
  timestamps: true, // Add timestamps to all logs
});
```

## Auto-Formatting Examples

```javascript
// Strings
log("Hello World");
// Output: [2024-01-15T10:30:45.123Z] Hello World

// Objects
info({ name: "John", age: 30 });
// Output: [2024-01-15T10:30:45.123Z] INFO: {
//   "name": "John",
//   "age": 30
// }

// Arrays
debug([1, 2, 3]);
// Output: [2024-01-15T10:30:45.123Z] DEBUG: Array(3): [1, 2, 3]

// Errors
error(new Error("Something went wrong"));
// Output: [2024-01-15T10:30:45.123Z] ERROR: Something went wrong
// Stack: Error: Something went wrong
//     at ...

// Timers
startTimer("operation");
// ... process
endTimer("operation");
// Output: [2024-01-15T10:30:45.123Z] INFO: Timer "operation" completed in 245ms
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import { log, success, error, configure } from "@bitterbyter/print";

configure({ environment: "development" });
success("TypeScript support!");
```

## License

MIT
