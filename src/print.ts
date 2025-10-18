
// --- Configuration ---

interface PrintConfig {
  environment: "development" | "production";
  timestamps: boolean;
}

let config: PrintConfig = {
  environment: "development",
  timestamps: true,
};

export const configure = (options: Partial<PrintConfig>) => {
  config = { ...config, ...options };

  return print;
};

// --- Core Logging ---

type LogType = "log" | "info" | "warn" | "error" | "debug" | "success";

const styles: Record<LogType, string> = {
  log: "",
  info: "color: #3F88C5",
  warn: "color: #F3CA40",
  error: "color: #D72638",
  debug: "color: #C04CFD",
  success: "color: #02C39A",
};

const formatData = (data: any): string => {
  if (typeof data === "string") {
    return data;
  }

  if (data instanceof Error) {
    return `${data.message}\nStack: ${data.stack}`;
  }

  if (Array.isArray(data)) {
    return `Array(${data.length}): [${data.join(", ")}]`;
  }

  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data, null, 2);
  }

  return String(data);
};

const print = (type: LogType, data: any) => {
  const formattedData = formatData(data);

  let log = formattedData;

  const style = styles[type];

  if (style) {
    log = `%c[${type.toUpperCase()}]${style} ${log}`;
  }

  if (config.timestamps) {
    log = `[${new Date().toISOString()}] ${log}`;
  }

  switch (type) {
    case "log":
      console.log(log);
      break;
    case "info":
      console.info(log);
      break;
    case "warn":
      console.warn(log);
      break;
    case "error":
      console.error(log);
      break;
    case "success":
      console.log(log);
      break;
    case "debug":
      console.debug(log);
      break;
    default:
      console.log(log);
      break;
  }
};

export const log = (data: any) => print("log", data);
export const info = (data: any) => print("info", data);
export const warn = (data: any) => print("warn", data);
export const error = (data: any) => print("error", data);
export const success = (data: any) => print("success", data);

export const debug = (data: any) => {
  if (config.environment === "production") {
    return;
  }

  print("debug", data);
};

// --- Data Formatting ---

export const table = (data: any) => {
  console.table(data);
};

export const count = (label: string) => {
  console.count(label);
};

export const countReset = (label: string) => {
  console.countReset(label);
};

export const dir = (data: any) => {
  console.dir(data);
};

export const dirxml = (data: any) => {
  console.dirxml(data);
};

// --- Timers ---

const timers = new Map<string, number>();

export const startTimer = (label: string) => {
  timers.set(label, performance.now());
};

export const endTimer = (label: string) => {
  const start = timers.get(label);

  if (!start) {
    console.warn(`Timer "${label}" not started.`);

    return;
  }

  const end = performance.now();
  const duration = (end - start).toFixed(2);

  info(`Timer "${label}" completed in ${duration}ms`);

  timers.delete(label);
};
