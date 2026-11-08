import { netflixTemplate } from './netflix';
import { instagramTemplate } from './instagram';
import { amazonTemplate } from './amazon';
import { youtubeTemplate } from './youtube';
import { blinkitTemplate } from './blinkit';
import { saasTemplate } from './saas';
import { emergentAntigravityTemplate } from './emergent_antigravity';
import {
  spotifyClone,
  omegleClone,
  figmaClone,
  zomatoClone,
  githubClone,
  googleClone,
  tiktokClone,
  canvaClone,
  ubuntuClone,
} from './clones';

export interface ProjectTemplate {
  name: string;
  category: string;
  description: string;
  files: Record<string, string>;
}

export const TEMPLATES: Record<string, ProjectTemplate> = {
  'emergent-antigravity': emergentAntigravityTemplate,
  'canva-designer': canvaClone,
  'ubuntu-desktop': ubuntuClone,
  'spotify-music': spotifyClone,
  'omegle-chat': omegleClone,
  'figma-studio': figmaClone,
  'zomato-food': zomatoClone,
  'github-dev': githubClone,
  'google-search': googleClone,
  'tiktok-short': tiktokClone,
  'netflix-streaming': netflixTemplate,
  'instagram-social': instagramTemplate,
  'amazon-commerce': amazonTemplate,
  'youtube-platform': youtubeTemplate,
  'blinkit-quick': blinkitTemplate,
  'nextjs-saas': saasTemplate,
};

export type TemplateKey =
  | 'emergent-antigravity'
  | 'canva-designer'
  | 'ubuntu-desktop'
  | 'spotify-music'
  | 'omegle-chat'
  | 'figma-studio'
  | 'zomato-food'
  | 'github-dev'
  | 'google-search'
  | 'tiktok-short'
  | 'netflix-streaming'
  | 'instagram-social'
  | 'amazon-commerce'
  | 'youtube-platform'
  | 'blinkit-quick'
  | 'nextjs-saas';

export function selectTemplateForPrompt(prompt: string): { key: TemplateKey; template: ProjectTemplate } {
  const p = prompt.toLowerCase();

  // 1. Canva Design Studio
  if (p.includes('canva') || p.includes('graphic design') || p.includes('poster maker') || p.includes('thumbnail designer')) {
    return { key: 'canva-designer', template: canvaClone };
  }

  // 2. Ubuntu / Linux OS Desktop Simulator
  if (p.includes('ubuntu') || p.includes('linux') || p.includes('operating system') || p.includes('desktop os') || p.includes('gnome')) {
    return { key: 'ubuntu-desktop', template: ubuntuClone };
  }

  // 3. Spotify Music & Podcasts
  if (p.includes('spotify') || p.includes('music') || p.includes('song') || p.includes('podcast') || p.includes('audio player')) {
    return { key: 'spotify-music', template: spotifyClone };
  }

  // 4. Omegle Random Video & Text Chat
  if (p.includes('omegle') || p.includes('random chat') || p.includes('stranger') || p.includes('roulette')) {
    return { key: 'omegle-chat', template: omegleClone };
  }

  // 5. Figma Vector Design Tool
  if (p.includes('figma') || p.includes('ui design') || p.includes('vector') || p.includes('wireframe')) {
    return { key: 'figma-studio', template: figmaClone };
  }

  // 6. Zomato & Swiggy Food Delivery
  if (p.includes('zomato') || p.includes('swiggy') || p.includes('food') || p.includes('restaurant') || p.includes('dish') || p.includes('delivery partner')) {
    return { key: 'zomato-food', template: zomatoClone };
  }

  // 7. GitHub Repository & Code Explorer
  if (p.includes('github') || p.includes('git') || p.includes('repo') || p.includes('commit') || p.includes('pull request')) {
    return { key: 'github-dev', template: githubClone };
  }

  // 8. Google Search & Google Maps
  if (p.includes('google maps') || p.includes('google') || p.includes('map') || p.includes('navigation') || p.includes('route') || p.includes('search engine')) {
    return { key: 'google-search', template: googleClone };
  }

  // 9. TikTok, VibeShort & Short Video Feed
  if (p.includes('tiktok') || p.includes('vibeshort') || p.includes('reels') || p.includes('short video') || p.includes('shorts') || p.includes('steezy')) {
    return { key: 'tiktok-short', template: tiktokClone };
  }

  // 10. Flagship Hybrid: Emergent, Antigravity, Prompt Perfect, WhatsApp, Telegram, Claude, In-App Builder
  if (
    p.includes('emergent') ||
    p.includes('antigravity') ||
    p.includes('prompt perfect') ||
    p.includes('whatsapp') ||
    p.includes('telegram') ||
    p.includes('claude') ||
    p.includes('toing') ||
    p.includes('build further') ||
    p.includes('fix all errors') ||
    p.includes('fix all bugs') ||
    p.includes('omni')
  ) {
    return { key: 'emergent-antigravity', template: emergentAntigravityTemplate };
  }

  // 11. Streaming: Netflix, Amazon Prime Video, Disney+, Hotstar
  if (
    p.includes('netflix') ||
    p.includes('prime video') ||
    p.includes('prime vedio') ||
    p.includes('hotstar') ||
    p.includes('disney') ||
    p.includes('stream') ||
    p.includes('movie')
  ) {
    return { key: 'netflix-streaming', template: netflixTemplate };
  }

  // 12. Social: Instagram, Threads, Snapchat, LinkedIn, Pinterest
  if (
    p.includes('instagram') ||
    p.includes('threads') ||
    p.includes('snapchat') ||
    p.includes('linkedin') ||
    p.includes('linkdin') ||
    p.includes('pinterest') ||
    p.includes('social') ||
    p.includes('photo') ||
    p.includes('feed')
  ) {
    return { key: 'instagram-social', template: instagramTemplate };
  }

  // 13. Quick-Commerce: Blinkit, Zepto, Swiggy Instamart
  if (p.includes('blinkit') || p.includes('zepto') || p.includes('quick-commerce') || p.includes('grocery') || p.includes('10-minute')) {
    return { key: 'blinkit-quick', template: blinkitTemplate };
  }

  // 14. E-Commerce: Amazon Store
  if (p.includes('amazon') || p.includes('e-commerce') || p.includes('store') || p.includes('shop') || p.includes('cart')) {
    return { key: 'amazon-commerce', template: amazonTemplate };
  }

  // 15. Video Platform: YouTube
  if (p.includes('youtube') || p.includes('video') || p.includes('channel')) {
    return { key: 'youtube-platform', template: youtubeTemplate };
  }

  // 16. Cloud & Hosting: Vercel, Render, Hostinger, Microsoft, Chrome
  return { key: 'nextjs-saas', template: saasTemplate };
}
