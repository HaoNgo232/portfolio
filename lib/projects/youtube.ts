/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
 */
export function parseYouTubeId(url: string): string | null {
  try {
    const urlObj = new URL(url);

    // youtu.be/ID
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }

    // youtube.com/watch?v=ID
    if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname === '/watch') {
        return urlObj.searchParams.get('v');
      }
      // youtube.com/embed/ID
      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/')[2];
      }
    }

    return null;
  } catch {
    return null;
  }
}
