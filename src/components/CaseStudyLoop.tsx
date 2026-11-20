import { useEffect, useRef } from 'react'

type CaseStudyLoopProps = {
  webm: string
  mp4: string
  poster: string
  title: string
}

export default function CaseStudyLoop({
  webm,
  mp4,
  poster,
  title,
}: CaseStudyLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      video.removeAttribute('autoplay')
      video.pause()
      return
    }

    const observer = new IntersectionObserver(
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

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="case-study__stage">
      <video
        ref={videoRef}
        className="case-study__video"
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${title} case study loop`}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  )
}
