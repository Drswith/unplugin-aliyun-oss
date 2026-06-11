export function normalizeUrl(url: string): string {
  const parts = url.split(/\/{2,}/);

  if (parts.length <= 2) {
    return url;
  }

  const [protocol, ...rest] = parts;
  return `${protocol}//${rest.join("/")}`;
}

export function slash(filePath: string): string {
  const isExtendedLengthPath = filePath.startsWith("\\\\?\\");
  const hasNonAscii = Array.from(filePath).some((char) => char.charCodeAt(0) > 127);

  if (isExtendedLengthPath || hasNonAscii) {
    return filePath;
  }

  return filePath.replace(/\\/g, "/");
}
