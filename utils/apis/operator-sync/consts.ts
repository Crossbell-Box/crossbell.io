export const baseUrl =
  process.env.NODE_ENV == "production"
    ? "https://sync.crossbell.io"
    : "https://test-sync.crossbell.io";