export const useSocialShare = () => {
  const config = useRuntimeConfig()
  const route = useRoute()

  const getShareUrl = (score?: number) => {
    if (import.meta.client) {
      const baseUrl = (config.public.baseUrl || window.location.origin).replace(/\/$/, '')

      if (score !== undefined && score !== null) {
        return `${baseUrl}/score_${score.toString().padStart(2, '0')}`
      }

      return `${baseUrl}${route.path}`
    }
    return ''
  }

  const openPopup = (url: string) => {
    if (import.meta.client) {
      window.open(url, '_blank', 'width=600,height=500,noopener,noreferrer')
    }
  }

  const share = (platform: 'facebook' | 'line' | 'x', score?: number) => {
    const targetUrl = getShareUrl(score)
    const encodedUrl = encodeURIComponent(targetUrl)

    console.log('Sharing URL:', targetUrl)

    switch (platform) {
      case 'facebook':
        openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)
        break
      case 'x':
        openPopup(`https://twitter.com/intent/tweet?url=${encodedUrl}`)
        break
      case 'line':
        openPopup(`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`)
        break
    }
  }

  return { share }
}
