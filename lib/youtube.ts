export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  duration: string
  viewCount: number
}

export async function getChannelVideos(channelId: string): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  
  if (!apiKey) {
    console.error('YouTube API key not configured')
    return []
  }

  try {
    // Get uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    )
    
    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel data')
    }

    const channelData = await channelResponse.json()
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      return []
    }

    // Get videos from uploads playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`
    )

    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlist items')
    }

    const playlistData = await playlistResponse.json()

    // Get video details including duration and view count
    const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',')
    
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`
    )

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch video details')
    }

    const videosData = await videosResponse.json()

    const videos: YouTubeVideo[] = videosData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
      publishedAt: video.snippet.publishedAt,
      duration: parseDuration(video.contentDetails.duration),
      viewCount: parseInt(video.statistics.viewCount || '0'),
    }))

    return videos
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return []
  }
}

export async function getVideoById(videoId: string): Promise<YouTubeVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY
  
  if (!apiKey) {
    return null
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    
    if (!data.items || data.items.length === 0) {
      return null
    }

    const video = data.items[0]

    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
      publishedAt: video.snippet.publishedAt,
      duration: parseDuration(video.contentDetails.duration),
      viewCount: parseInt(video.statistics.viewCount || '0'),
    }
  } catch (error) {
    console.error('Error fetching YouTube video:', error)
    return null
  }
}

function parseDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  
  if (!match) return '0:00'

  const hours = (match[1] || '').replace('H', '')
  const minutes = (match[2] || '').replace('M', '')
  const seconds = (match[3] || '').replace('S', '')

  const parts = []
  
  if (hours) parts.push(hours.padStart(2, '0'))
  parts.push((minutes || '0').padStart(2, '0'))
  parts.push((seconds || '0').padStart(2, '0'))

  return parts.join(':')
}

