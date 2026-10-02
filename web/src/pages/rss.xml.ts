import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEpisodes } from '../lib/episodes';
import { site } from '../site.config';

// Site update feed (episode pages). Your podcast host (Spotify for Creators,
// Buzzsprout, etc.) provides the audio RSS feed that Apple/Spotify ingest.
export async function GET(context: APIContext) {
  const episodes = await getEpisodes();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    items: episodes.map((ep) => ({
      title: ep.data.title,
      description: ep.data.description,
      pubDate: ep.data.pubDate,
      link: `/episodes/${ep.id}/`,
    })),
  });
}
