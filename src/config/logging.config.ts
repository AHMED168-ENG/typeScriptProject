import path from "path";
import winston, { format } from "winston";
const { printf, combine, label, timestamp } = format;

export class LoggingConfig {
  public myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

  constructor() {}
  logging() {
    const logger = winston.createLogger({
      level: "info",
      format: combine(
        label({ label: "right meow!" }),
        timestamp(),
        this.myFormat
      ),
      transports: [
        new winston.transports.File({
          filename: path.join(__dirname, "../logging/error.log"),
          level: "error",
        }),
        new winston.transports.File({
          filename: path.join(__dirname, "../logging/combined.log"),
          level: "info",
        }),
      ],
    });
    if (process.env.NODE_SERVER_ENV !== "production") {
      logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
    return logger;
  }
}
