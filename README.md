# print

`print` is a developer-friendly logging tool with clean APIs, automatic timestamps, and smart data type detection

## Features

- **Method-based API**: Clean `print.success()` syntax
- **Auto-formatting**: Detects data types and formats appropriately
- **Timer management**: Built-in timing with automatic duration logging
- **Environment awareness**: Debug logs skip in production
- **Timestamps**: Optional timestamps on all logs (except timers)
- **TypeScript support**: Full TypeScript definitions included
- **ES Module support**: Works in React/Next.js and Node.js

## Installation

```bash
npm install @bitterbyter/print
```

## Usage

### Configuration

```javascript
const print = require("@bitterbyter/print");

// Configure the print function
print.configure({
  environment: 'development', // 'development' | 'production'
  timestamps: true,           // Add timestamps to logs
});
```

### CommonJS (Node.js)

```javascript
const print = require("@bitterbyter/print");

// Basic logging
print.success('Operation completed successfully!');
print.error('Something went wrong');
print.info('Here is some information');
print.warn('This might be an issue');
print.debug('Debug information'); // Only logs in development

// Auto-formatting
print("Hello World");              // Simple string
print.info({ name: "John" });      // Auto-formats as JSON
print.debug([1, 2, 3]);            // Auto-formats as array
print.error(new Error("Oops"));    // Auto-formats with stack trace

// Timer usage
print.startTimer('api-call');
// ... API call
print.endTimer('api-call'); // Auto-prints duration

// Data formatting
print.table(data);        // Console table
print.dir(object);        // Console dir
print.dirxml(element);    // Console dirxml

// Counting
print.count('counter-name');
print.countReset('counter-name');

// Performance logging
print.performance('slow-function'); // Only logs in development
```

### ES Modules (React/Next.js)

```javascript
import print, { success, startTimer, endTimer, info, debug } from '@bitterbyter/print';

// Configuration
print.configure({
  environment: 'development',
  timestamps: true,
});

// Usage
success('Hello, World!');
startTimer('test');
endTimer('test'); // Auto-prints duration

info({ name: "John" });        // Auto-formats as JSON
debug([1, 2, 3]);              // Auto-formats as array
```

## Available Methods

### Core Logging
- `print.log(data)` - Basic logging
- `print.success(data)` - Success messages
- `print.error(data)` - Error messages
- `print.info(data)` - Information messages
- `print.warn(data)` - Warning messages
- `print.debug(data)` - Debug messages (development only)

### Data Formatting
- `print.table(data)` - Display data as table
- `print.dir(data)` - Display object properties
- `print.dirxml(data)` - Display XML/HTML structure

### Counting
- `print.count(label)` - Count occurrences
- `print.countReset(label)` - Reset counter

### Timing
- `print.startTimer(label)` - Start timer
- `print.endTimer(label)` - End timer and log duration

### Performance
- `print.performance(data)` - Performance logging (development only)

## Configuration Options

```javascript
print.configure({
  environment: 'development', // 'development' | 'production'
  timestamps: true,           // Add timestamps to all logs (except timers)
});
```

## Auto-Formatting Examples

```javascript
// Strings
print("Hello World");
// Output: [2024-01-15T10:30:45.123Z] Hello World

// Objects
print.info({ name: "John", age: 30 });
// Output: [2024-01-15T10:30:45.123Z] INFO: {
//   "name": "John",
//   "age": 30
// }

// Arrays
print.debug([1, 2, 3]);
// Output: [2024-01-15T10:30:45.123Z] DEBUG: Array(3): [1, 2, 3]

// Errors
print.error(new Error("Something went wrong"));
// Output: [2024-01-15T10:30:45.123Z] ERROR: Something went wrong
// Stack: Error: Something went wrong
//     at ...

// Timers
print.startTimer('operation');
// ... process
print.endTimer('operation');
// Output: operation: 245ms
// Timer 'operation' completed in 245ms
```

## TypeScript Support

Full TypeScript definitions are included. Import types as needed:

```typescript
import print from '@bitterbyter/print';

const logger = print;

logger.configure({ environment: 'development' });
logger.success('TypeScript support!');
```
