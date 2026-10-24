// Turns an import.meta.glob result into { "file-name": url }, dropping the folder and extension.
// The glob pattern itself must stay a literal in the calling file (Vite requirement).
export function byFileName(files: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), url]),
  )
}
