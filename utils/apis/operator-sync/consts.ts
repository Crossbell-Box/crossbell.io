export const baseUrl =
  process.env.NODE_ENV == "production"
    ? "https://opsync.crossbell.io"
    : "https://test-opsync.crossbell.io";

export const SCOPE_KEY = ["opsync"];
