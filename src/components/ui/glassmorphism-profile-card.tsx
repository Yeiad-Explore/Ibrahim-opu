import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Copy, Plus, Zap } from 'lucide-react'

import SpecularButton from '@/components/ui/SpecularButton'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ComponentProps {
  name?: string
  role?: string
  email?: string
  avatarSrc?: string
  statusText?: string
  statusColor?: string
  glowText?: string
  className?: string
}

export default function Component({
  name = 'Ibrahim Bin Akther',
  role = 'Digital Marketing Instructor',
  email = 'musa24bd@gmail.com',
  avatarSrc = '/portfolio-atmosphere.jpg',
  statusText = 'Available for work',
  statusColor = 'bg-lime-500',
  glowText = 'Currently High on Creativity',
  className,
}: ComponentProps) {
  const [copied, setCopied] = useState(false)

  const timeText = useMemo(() => {
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes().toString().padStart(2, '0')
    const hour12 = ((h + 11) % 12) + 1
    const ampm = h >= 12 ? 'PM' : 'AM'
    return `${hour12}:${m}${ampm}`
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard may be unavailable in some contexts.
    }
  }

  return (
    <motion.div
      initial={false}
      className={cn('relative w-full', className)}
    >
      <div className="pointer-events-none absolute inset-x-3 -bottom-10 top-[90%] z-0 rounded-[28px] bg-lime-400/90 blur-0 shadow-[0_40px_80px_-16px_rgba(163,230,53,0.8)]" />

      <div className="absolute inset-x-0 -bottom-10 z-0 mx-auto w-full">
        <div className="flex items-center justify-center gap-2 bg-transparent py-3 text-center text-sm font-medium text-black">
          <Zap className="h-4 w-4" /> {glowText}
        </div>
      </div>

      <Card
        className={cn(
          'relative z-10 mx-auto w-full max-w-3xl overflow-visible rounded-[20px]',
          'bg-white/10 backdrop-blur-xl dark:bg-white/5',
          'border border-b-0 border-black/20 dark:border-white/10',
          'shadow-lg shadow-black/20 hover:shadow-black/10',
        )}
      >
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'inline-block h-2.5 w-2.5 animate-pulse rounded-full',
                  statusColor,
                )}
              />
              <span className="select-none">{statusText}</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Clock className="h-4 w-4" />
              <span className="tabular-nums">{timeText}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-5">
            <div className="relative h-52 w-52 shrink-0 overflow-hidden rounded-[20px] ring-2 ring-white/10">
              <img
                src={avatarSrc}
                alt={`${name} avatar`}
                width={208}
                height={208}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 text-center">
              <h3 className="truncate text-xl font-semibold tracking-tight sm:text-3xl">
                {name}
              </h3>
              <p className="mt-0.5 text-sm text-neutral-400">{role}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SpecularButton
              size="md"
              radius={18}
              tint="#ffffff"
              tintOpacity={0.06}
              blur={6}
              textColor="#f5f5f5"
              lineColor="#b8efec"
              baseColor="#525252"
              intensity={1}
              idleIntensity={0.35}
              shineSize={10}
              shineFade={34}
              thickness={1.2}
              glow={1}
              followMouse
              proximity={220}
              className="w-full"
              onClick={() => {
                window.location.href = `mailto:${email}`
              }}
            >
              <Plus className="h-4 w-4" /> Hire Me
            </SpecularButton>

            <SpecularButton
              size="md"
              radius={18}
              tint="#ffffff"
              tintOpacity={0.06}
              blur={6}
              textColor="#f5f5f5"
              lineColor="#ffffff"
              baseColor="#525252"
              intensity={1}
              idleIntensity={0.35}
              shineSize={10}
              shineFade={34}
              thickness={1.2}
              glow={1}
              followMouse
              proximity={220}
              className="w-full"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy Email'}
            </SpecularButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
