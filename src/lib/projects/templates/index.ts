import { netflixTemplate } from './netflix';
import { instagramTemplate } from './instagram';
import { amazonTemplate } from './amazon';
import { youtubeTemplate } from './youtube';
import { blinkitTemplate } from './blinkit';
import { saasTemplate } from './saas';

export interface ProjectTemplate {
  name: string;
  category: string;
  description: string;
  files: Record<string, string>;
}

export const TEMPLATES: Record<string, ProjectTemplate> = {
  'netflix-streaming': netflixTemplate,
  'instagram-social': instagramTemplate,
  'amazon-commerce': amazonTemplate,
  'youtube-platform': youtubeTemplate,
  'blinkit-quick': blinkitTemplate,
  'nextjs-saas': saasTemplate,
};

export type TemplateKey =
  | 'netflix-streaming'
  | 'instagram-social'
  | 'amazon-commerce'
  | 'youtube-platform'
  | 'blinkit-quick'
  | 'nextjs-saas';

export function selectTemplateForPrompt(prompt: string): { key: TemplateKey; template: ProjectTemplate } {
  const p = prompt.toLowerCase();
  if (p.includes('netflix') || p.includes('stream') || p.includes('movie')) {
    return { key: 'netflix-streaming', template: netflixTemplate };
  }
  if (p.includes('instagram') || p.includes('social') || p.includes('photo') || p.includes('feed')) {
    return { key: 'instagram-social', template: instagramTemplate };
  }
  if (p.includes('blinkit') || p.includes('quick-commerce') || p.includes('grocery') || p.includes('10-minute')) {
    return { key: 'blinkit-quick', template: blinkitTemplate };
  }
  if (p.includes('amazon') || p.includes('e-commerce') || p.includes('store') || p.includes('shop') || p.includes('cart')) {
    return { key: 'amazon-commerce', template: amazonTemplate };
  }
  if (p.includes('youtube') || p.includes('video') || p.includes('channel')) {
    return { key: 'youtube-platform', template: youtubeTemplate };
  }
  return { key: 'nextjs-saas', template: saasTemplate };
}
