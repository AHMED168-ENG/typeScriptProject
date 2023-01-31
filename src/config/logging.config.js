const path = require("path");
const { createLogger, format, transports } = require("winston");
// const { printf, combine, label, timestamp } = format;

function logging() {
  const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.simple()),
    transports: [
      new transports.File({
        filename: path.join(__dirname, "../logging/error.log"),
        level: "error",
      }),
      new transports.File({
        filename: path.join(__dirname, "../logging/combined.log"),
        level: "info",
      }),
    ],
  });
  if (process.env.NODE_SERVER_ENV !== "production") {
    logger.add(
      new transports.Console({
        format: format.simple(),
      })
    );
  }
  return logger;
}

module.exports = {
  logging,
};
