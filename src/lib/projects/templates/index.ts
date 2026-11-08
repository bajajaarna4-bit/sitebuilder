import { netflixTemplate } from './netflix';
import { instagramTemplate } from './instagram';
import { amazonTemplate } from './amazon';
import { youtubeTemplate } from './youtube';
import { blinkitTemplate } from './blinkit';
import { saasTemplate } from './saas';
import { emergentAntigravityTemplate } from './emergent_antigravity';
import { pokiClone } from './poki';
import { googleAiNetflixTemplate } from './google_ai_netflix';
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
import {
  uberRapidoOlaClone,
  whatsappClone,
  claudeClone,
  chromeClone,
  snapchatClone,
  primeVideoClone,
  steezyStudioClone,
  hostingerClone,
  microsoftClone,
  vercelClone,
  linkedinClone,
} from './clones_more';
import { synthesizeDynamicApp } from '@/lib/ai/dynamic_generator';

export interface ProjectTemplate {
  name: string;
  category: string;
  description: string;
  files: Record<string, string>;
}

export const TEMPLATES: Record<string, ProjectTemplate> = {
  'google-ai-netflix': googleAiNetflixTemplate,
  'poki-games': pokiClone,
  'uber-rapido-ola': uberRapidoOlaClone,
  'whatsapp-web': whatsappClone,
  'claude-ai': claudeClone,
  'chrome-browser': chromeClone,
  'snapchat-social': snapchatClone,
  'prime-video': primeVideoClone,
  'steezy-studio': steezyStudioClone,
  'hostinger-cloud': hostingerClone,
  'microsoft-365': microsoftClone,
  'vercel-cloud': vercelClone,
  'linkedin-network': linkedinClone,
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
  | 'google-ai-netflix'
  | 'poki-games'
  | 'uber-rapido-ola'
  | 'whatsapp-web'
  | 'claude-ai'
  | 'chrome-browser'
  | 'snapchat-social'
  | 'prime-video'
  | 'steezy-studio'
  | 'hostinger-cloud'
  | 'microsoft-365'
  | 'vercel-cloud'
  | 'linkedin-network'
  | 'dynamic-adaptive'
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
  const p = (prompt || '').toLowerCase().trim();

  // 0. Google AI Studio & Netflix Cinema (Cinematic 4K Video Streaming & Animations)
  if (
    p.includes('google ai') ||
    p.includes('deepmind') ||
    (p.includes('google') && (p.includes('netflix') || p.includes('cinema') || p.includes('stream') || p.includes('movie') || p.includes('animation') || p.includes('animations') || p.includes('ai'))) ||
    (p.includes('netflix') && (p.includes('google') || p.includes('ai') || p.includes('workspace') || p.includes('animation') || p.includes('animations') || p.includes('vedio') || p.includes('video'))) ||
    p.includes('animations please') ||
    p.includes('vedios and animations') ||
    p.includes('videos and animations') ||
    p.includes('include vedios') ||
    p.includes('include videos') ||
    p.includes('cinema') ||
    (p.includes('netflix') && !p.includes('disney') && !p.includes('hotstar'))
  ) {
    return { key: 'google-ai-netflix', template: googleAiNetflixTemplate };
  }

  // 1. Poki, Subway Surfer & Playable Arcade Games
  if (
    p.includes('poki') ||
    p.includes('subway') ||
    p.includes('surfer') ||
    p.includes('game') ||
    p.includes('arcade') ||
    p.includes('runner') ||
    p.includes('play') ||
    p.includes('gaming')
  ) {
    return { key: 'poki-games', template: pokiClone };
  }

  // 2. Uber, Rapido, Ola & Unified Mobility
  if (
    p.includes('uber') ||
    p.includes('rapido') ||
    p.includes('ola') ||
    p.includes('cab') ||
    p.includes('taxi') ||
    p.includes('bike-taxi') ||
    p.includes('transit') ||
    p.includes('mobility') ||
    p.includes('auto rickshaw')
  ) {
    return { key: 'uber-rapido-ola', template: uberRapidoOlaClone };
  }

  // 3. WhatsApp Web & Instant Messaging
  if (p.includes('whatsapp') || p.includes('whatsap')) {
    return { key: 'whatsapp-web', template: whatsappClone };
  }

  // 4. Claude AI Workspace
  if (p.includes('claude') || p.includes('anthropic') || p.includes('artifact')) {
    return { key: 'claude-ai', template: claudeClone };
  }

  // 5. Google Chrome Browser Simulator
  if (p.includes('chrome') || p.includes('browser') || p.includes('omnibar')) {
    return { key: 'chrome-browser', template: chromeClone };
  }

  // 6. Snapchat AR & Snaps
  if (p.includes('snapchat') || p.includes('snap streak') || p.includes('streaks') || p.includes('filters')) {
    return { key: 'snapchat-social', template: snapchatClone };
  }

  // 7. Amazon Prime Video
  if (p.includes('prime video') || p.includes('prime vedio') || p.includes('amazon prime')) {
    return { key: 'prime-video', template: primeVideoClone };
  }

  // 8. Steezy Studio Dance & Movement
  if (p.includes('steezy') || p.includes('dance') || p.includes('movement') || p.includes('choreography')) {
    return { key: 'steezy-studio', template: steezyStudioClone };
  }

  // 9. Hostinger & Cloud Infrastructure
  if (p.includes('hostinger') || p.includes('hpanel') || p.includes('domain control') || p.includes('cpanel')) {
    return { key: 'hostinger-cloud', template: hostingerClone };
  }

  // 10. Microsoft 365
  if (p.includes('microsoft') || p.includes('ms office') || p.includes('word') || p.includes('excel')) {
    return { key: 'microsoft-365', template: microsoftClone };
  }

  // 11. Vercel & Render Cloud
  if (p.includes('vercel') || p.includes('render') || p.includes('serverless deploy')) {
    return { key: 'vercel-cloud', template: vercelClone };
  }

  // 12. LinkedIn Professional Network
  if (p.includes('linkedin') || p.includes('linkdin') || p.includes('professional network') || p.includes('job board')) {
    return { key: 'linkedin-network', template: linkedinClone };
  }

  // 13. Canva Design Studio
  if (p.includes('canva') || p.includes('graphic design') || p.includes('poster maker') || p.includes('thumbnail designer')) {
    return { key: 'canva-designer', template: canvaClone };
  }

  // 14. Ubuntu / Linux OS Desktop Simulator
  if (p.includes('ubuntu') || p.includes('linux') || p.includes('operating system') || p.includes('desktop os') || p.includes('gnome')) {
    return { key: 'ubuntu-desktop', template: ubuntuClone };
  }

  // 15. Spotify Music & Podcasts
  if (p.includes('spotify') || p.includes('music') || p.includes('song') || p.includes('podcast') || p.includes('audio player')) {
    return { key: 'spotify-music', template: spotifyClone };
  }

  // 16. Omegle Random Video & Text Chat
  if (p.includes('omegle') || p.includes('random chat') || p.includes('stranger') || p.includes('roulette')) {
    return { key: 'omegle-chat', template: omegleClone };
  }

  // 17. Figma Vector Design Tool
  if (p.includes('figma') || p.includes('ui design') || p.includes('vector') || p.includes('wireframe')) {
    return { key: 'figma-studio', template: figmaClone };
  }

  // 18. Zomato & Swiggy Food Delivery
  if (p.includes('zomato') || p.includes('swiggy') || p.includes('food') || p.includes('restaurant') || p.includes('dish') || p.includes('delivery partner')) {
    return { key: 'zomato-food', template: zomatoClone };
  }

  // 19. GitHub Repository & Code Explorer
  if (p.includes('github') || p.includes('git') || p.includes('repo') || p.includes('commit') || p.includes('pull request')) {
    return { key: 'github-dev', template: githubClone };
  }

  // 20. Google Search & Google Maps (Restricted to search engine queries, never AI or Cinema)
  if (
    (p.includes('google maps') ||
      p.includes('google search') ||
      p.includes('search engine') ||
      p.includes('google web') ||
      p === 'google' ||
      p === 'google.com') &&
    !p.includes('google ai') &&
    !p.includes('netflix') &&
    !p.includes('animation') &&
    !p.includes('vedio') &&
    !p.includes('video')
  ) {
    return { key: 'google-search', template: googleClone };
  }

  // 21. TikTok, VibeShort & Short Video Feed
  if (p.includes('tiktok') || p.includes('vibeshort') || p.includes('reels') || p.includes('short video') || p.includes('shorts')) {
    return { key: 'tiktok-short', template: tiktokClone };
  }

  // 22. Flagship Hybrid: Emergent, Antigravity, Prompt Perfect, Toing
  if (
    p.includes('emergent') ||
    p.includes('antigravity') ||
    p.includes('prompt perfect') ||
    p.includes('telegram') ||
    p.includes('toing') ||
    p.includes('omni')
  ) {
    return { key: 'emergent-antigravity', template: emergentAntigravityTemplate };
  }

  // 23. Streaming: Netflix, Disney+, Hotstar
  if (
    p.includes('netflix') ||
    p.includes('hotstar') ||
    p.includes('disney') ||
    p.includes('stream') ||
    p.includes('movie')
  ) {
    return { key: 'netflix-streaming', template: netflixTemplate };
  }

  // 24. Social: Instagram, Threads, Pinterest
  if (
    p.includes('instagram') ||
    p.includes('threads') ||
    p.includes('pinterest') ||
    p.includes('social') ||
    p.includes('photo') ||
    p.includes('feed')
  ) {
    return { key: 'instagram-social', template: instagramTemplate };
  }

  // 25. Quick-Commerce: Blinkit, Zepto, Swiggy Instamart
  if (p.includes('blinkit') || p.includes('zepto') || p.includes('quick-commerce') || p.includes('grocery') || p.includes('10-minute')) {
    return { key: 'blinkit-quick', template: blinkitTemplate };
  }

  // 26. E-Commerce: Amazon Store
  if (p.includes('amazon') || p.includes('e-commerce') || p.includes('store') || p.includes('shop') || p.includes('cart')) {
    return { key: 'amazon-commerce', template: amazonTemplate };
  }

  // 27. Video Platform: YouTube
  if (p.includes('youtube') || p.includes('video') || p.includes('channel')) {
    return { key: 'youtube-platform', template: youtubeTemplate };
  }

  // 28. Dynamic Adaptive Synthesis for custom prompts (Never repetitive!)
  if (prompt && prompt.trim().length > 3) {
    return { key: 'dynamic-adaptive', template: synthesizeDynamicApp(prompt) };
  }

  // 29. Default to Poki Arcade Suite
  return { key: 'poki-games', template: pokiClone };
}
