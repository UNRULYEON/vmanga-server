import { config, createLogger, format, transports } from "winston";

const loggerFormat = format.printf(
  ({ level, message, timestamp }) => `${getLevel(level as level)} [${timestamp}] ${message}`
);

const logger = createLogger({
  levels: config.syslog.levels,
  format: format.combine(format.splat(), format.timestamp(), format.align(), loggerFormat),
  transports: [new transports.Console()],
});

export enum Color {
  Reset = "\x1b[0m",
  Bright = "\x1b[1m",
  Dim = "\x1b[2m",
  Underscore = "\x1b[4m",
  Blink = "\x1b[5m",
  Reverse = "\x1b[7m",
  Hidden = "\x1b[8m",

  FgBlack = "\x1b[30m",
  FgRed = "\x1b[31m",
  FgGreen = "\x1b[32m",
  FgYellow = "\x1b[33m",
  FgBlue = "\x1b[34m",
  FgMagenta = "\x1b[35m",
  FgCyan = "\x1b[36m",
  FgWhite = "\x1b[37m",

  BgBlack = "\x1b[40m",
  BgRed = "\x1b[41m",
  BgGreen = "\x1b[42m",
  BgYellow = "\x1b[43m",
  BgBlue = "\x1b[44m",
  BgMagenta = "\x1b[45m",
  BgCyan = "\x1b[46m",
  BgWhite = "\x1b[47m",
}

type level = "emerg" | "alert" | "crit" | "error" | "warning" | "notice" | "info" | "debug";

const getLevel = (level: level) => {
  switch (level) {
    case "emerg":
    case "alert":
    case "crit":
    case "error":
      return `${Color["FgWhite"]}${Color["BgRed"]}[${level.toUpperCase()}]${Color["Reset"]}`;
    case "warning":
      return `${Color["FgWhite"]}${Color["BgYellow"]}[${level.toUpperCase()}]${Color["Reset"]}`;
    case "notice":
      return `${Color["FgWhite"]}${Color["BgBlue"]}[${level.toUpperCase()}]${Color["Reset"]}`;
    case "info":
      return `${Color["FgBlack"]}${Color["BgWhite"]}[${level.toUpperCase()}]${Color["Reset"]}`;
    case "debug":
    default:
      return `${Color["FgWhite"]}${Color["BgRed"]}[${level.toUpperCase()}]${Color["Reset"]}`;
  }
};

export default logger;
