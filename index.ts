interface PrintConfig {
  environment: 'development' | 'production';
  timestamps: boolean;
}

let config: PrintConfig = {
  environment: 'development',
  timestamps: true,
};

const timers = new Map<string, number>();

function print(data: any): void {
  const formattedData = formatData(data);

  if (config.timestamps) {
    console.log(`[${new Date().toISOString()}] ${formattedData}`);
  } else {
    console.log(formattedData);
  }
}

print.configure = function (options: Partial<PrintConfig>): typeof print {
  config = { ...config, ...options };

  return print;
};

print.log = function (data: any): void {
  const formattedData = formatData(data);

  if (config.timestamps) {
    console.log(`[${new Date().toISOString()}] ${formattedData}`);
  } else {
    console.log(formattedData);
  }
};

print.success = function (data: any): void {
  const formattedData = formatData(data);

  if (config.timestamps) {
    console.log(`[${new Date().toISOString()}] SUCCESS: ${formattedData}`);
  } else {
    console.log(`SUCCESS: ${formattedData}`);
  }
};

print.error = function (data: any): void {
  const formattedData = formatData(data);

  if (config.timestamps) {
    console.error(`[${new Date().toISOString()}] ERROR: ${formattedData}`);
  } else {
    console.error(`ERROR: ${formattedData}`);
  }
};

print.info = function (data: any): void {
  const formattedData = formatData(data);

  if (config.timestamps) {
    console.info(`[${new Date().toISOString()}] INFO: ${formattedData}`);
  } else {
    console.info(`INFO: ${formattedData}`);
  }
};

print.warn = function (data: any): void {
  const formattedData = formatData(data);

  if (config.timestamps) {
    console.warn(`[${new Date().toISOString()}] WARN: ${formattedData}`);
  } else {
    console.warn(`WARN: ${formattedData}`);
  }
};

print.debug = function (data: any): void {
  if (config.environment === 'production') { return; }

  const formattedData = formatData(data);

  if (config.timestamps) {
    console.debug(`[${new Date().toISOString()}] DEBUG: ${formattedData}`);
  } else {
    console.debug(`DEBUG: ${formattedData}`);
  }
};

print.table = function (data: any): void {
  console.table(data);
};

print.count = function (label: string): void {
  console.count(label);
};

print.countReset = function (label: string): void {
  console.countReset(label);
};

print.dir = function (data: any): void {
  console.dir(data);
};

print.dirxml = function (data: any): void {
  console.dirxml(data);
};

print.startTimer = function (label: string): void {
  timers.set(label, Date.now());

  console.time(label);
};

print.endTimer = function (label: string): void {
  if (timers.has(label)) {
    const startTime = timers.get(label)!;
    const duration = Date.now() - startTime;

    console.timeEnd(label);

    console.log(`Timer '${label}' completed in ${duration}ms`);

    timers.delete(label);
  } else {
    console.warn(`Timer '${label}' was not started`);
  }
};

print.performance = function (data: any): void {
  if (config.environment === 'production') return;

  const formattedData = formatData(data);

  if (config.timestamps) {
    console.log(`[${new Date().toISOString()}] PERFORMANCE: ${formattedData}`);
  } else {
    console.log(`PERFORMANCE: ${formattedData}`);
  }
};

function formatData(data: any): string {
  if (typeof data === 'string') {
    return data;
  }

  if (data instanceof Error) {
    return `${data.message}\nStack: ${data.stack}`;
  }

  if (Array.isArray(data)) {
    return `Array(${data.length}): [${data.join(', ')}]`;
  }

  if (typeof data === 'object' && data !== null) {
    return JSON.stringify(data, null, 2);
  }

  return String(data);
}

// Exports for Vanilla JS
module.exports = print;

// Exports for ES modules
module.exports.default = print;
module.exports.print = print;
module.exports.success = print.success;
module.exports.error = print.error;
module.exports.info = print.info;
module.exports.warn = print.warn;
module.exports.debug = print.debug;
module.exports.table = print.table;
module.exports.count = print.count;
module.exports.countReset = print.countReset;
module.exports.dir = print.dir;
module.exports.dirxml = print.dirxml;
module.exports.startTimer = print.startTimer;
module.exports.endTimer = print.endTimer;
module.exports.performance = print.performance;
