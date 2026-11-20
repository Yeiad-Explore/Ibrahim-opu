import { useEffect, useRef } from 'react'

type CaseStudyLoopProps = {
  webm: string
  mp4: string
  poster: string
  title: string
}

const blockEvent = (event: {
  preventDefault: () => void
  stopPropagation: () => void
}) => {
  event.preventDefault()
  event.stopPropagation()
}

export default function CaseStudyLoop({
  webm,
  mp4,
  poster,
  title,
}: CaseStudyLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const stage = stageRef.current
    if (!video || !stage) return

    const objectUrls: string[] = []
    let cancelled = false
    let observer: IntersectionObserver | undefined

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const guardEvents = [
      'contextmenu',
      'dragstart',
      'selectstart',
    ] as const

    for (const name of guardEvents) {
      stage.addEventListener(name, blockEvent)
      video.addEventListener(name, blockEvent)
    }

    const setupPlayback = () => {
      if (reduceMotion) {
        video.pause()
        return
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            void video.play().catch(() => undefined)
          } else {
            video.pause()
          }
        },
        { threshold: [0, 0.45, 0.75] },
      )

      observer.observe(stage)
    }

    const loadProtectedSources = async () => {
      try {
        const [webmResponse, mp4Response] = await Promise.all([
          fetch(webm, { credentials: 'same-origin' }),
          fetch(mp4, { credentials: 'same-origin' }),
        ])

        if (!webmResponse.ok || !mp4Response.ok) {
          throw new Error('Case study media failed to load')
        }

        const [webmBlob, mp4Blob] = await Promise.all([
          webmResponse.blob(),
          mp4Response.blob(),
        ])

        if (cancelled) return

        const webmUrl = URL.createObjectURL(webmBlob)
        const mp4Url = URL.createObjectURL(mp4Blob)
        objectUrls.push(webmUrl, mp4Url)

        video.replaceChildren()

        const webmSource = document.createElement('source')
        webmSource.src = webmUrl
        webmSource.type = 'video/webm'

        const mp4Source = document.createElement('source')
        mp4Source.src = mp4Url
        mp4Source.type = 'video/mp4'

        video.append(webmSource, mp4Source)
        video.load()
        setupPlayback()
      } catch {
        if (cancelled) return
        // Fallback keeps the page usable if blob loading fails.
        video.replaceChildren()
        const webmSource = document.createElement('source')
        webmSource.src = webm
        webmSource.type = 'video/webm'
        const mp4Source = document.createElement('source')
        mp4Source.src = mp4
        mp4Source.type = 'video/mp4'
        video.append(webmSource, mp4Source)
        video.load()
        setupPlayback()
      }
    }

    void loadProtectedSources()

    return () => {
      cancelled = true
      observer?.disconnect()
      for (const name of guardEvents) {
        stage.removeEventListener(name, blockEvent)
        video.removeEventListener(name, blockEvent)
      }
      for (const url of objectUrls) URL.revokeObjectURL(url)
    }
  }, [webm, mp4])

  return (
    <div
      ref={stageRef}
      className="case-study__stage"
      onContextMenu={blockEvent}
    >
      <video
        ref={videoRef}
        className="case-study__video"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload noplaybackrate noremoteplayback"
        draggable={false}
        tabIndex={-1}
        aria-label={`${title} case study loop`}
        onContextMenu={blockEvent}
        onDragStart={blockEvent}
      />
      <div
        className="case-study__shield"
        aria-hidden="true"
        onContextMenu={blockEvent}
        onDragStart={blockEvent}
      />
    </div>
  )
}
