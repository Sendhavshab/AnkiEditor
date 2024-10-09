import { StringToCodeWord } from '../functions/StrToCode'
import { generateRandomString } from '../functions/RandomStr'
import { toast } from 'react-toastify';

const Share = (shareTo: 'me' | 'other', realId: string) => {
  let link = window.location.href

  if (shareTo === 'other') {
    if (link.charAt(link.length - 1) === '/') {
      link = link + generateRandomString(5)
    } else {
      link = link + '/' + generateRandomString(5)
    }

    const codeWordId = StringToCodeWord(realId)

    link = link.replace(realId, codeWordId)

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'my assignment',
            text: 'checkout my assignment and see what is error in this',
            url: link,
          })
        } catch (error) {
          toast.error('Failed to share link');
        }
      } else {
        navigator.clipboard
          .writeText(link)
          .then(() => {
            toast.success('Link Copied successfully to Clipboard');
          })
          .catch(() => {
            toast.error('Failed to copy link to clipboard');
          })
      }
    }

    handleShare()
  } else {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success('Link Copied successfully to Clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy link to clipboard');
      })
  }
}

export default Share
