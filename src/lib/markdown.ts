import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Yönetici metnini Markdown'dan güvenli HTML'e çevirir (ham HTML de temizlenir).
export function renderMarkdown(md: string): string {
  return DOMPurify.sanitize(marked.parse(md, { async: false, gfm: true, breaks: false }) as string);
}
