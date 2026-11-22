import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import CaseStudyLoop from '@/components/CaseStudyLoop'
import GlassmorphismProfileCard from '@/components/ui/glassmorphism-profile-card'
import MagicBento from '@/components/ui/MagicBento'
import SpecularButton from '@/components/ui/SpecularButton'
import './App.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const experience = [
  {
    role: 'Digital Marketing Instructor',
    company: "Mentors' IT",
    period: '2024 - Present',
    description:
      'Teach Facebook Ads, SEO and social media marketing through practical campaign work, audience targeting and online strategy.',
    detail:
      'Guide learners with real tools and prepare them for freelancing and marketing careers.',
  },
  {
    role: 'Customer Service Executive',
    company: 'Digicon Technologies Ltd. (Beximco)',
    period: '2020 - 2022',
    description:
      'Handled inquiries and complaints across digital channels while keeping service quality and response standards in focus.',
    detail:
      'Followed open cases through resolution with clear, professional communication.',
  },
  {
    role: 'Customer Service Executive',
    company: 'Genex Infosys Ltd. / Grameenphone Project',
    period: '2019 - 2020',
    description:
      'Supported Grameenphone customers with service and technical issues.',
    detail:
      'Delivered accurate, prompt solutions with a strong customer focus.',
  },
]

const capabilityItems = [
  {
    id: 'campaign-craft',
    label: 'Marketing',
    title: 'Campaign craft',
    description:
      'Facebook Ads setup, audience targeting and practical online strategy.',
    visual: 'analytics',
  },
  {
    id: 'search-clarity',
    label: 'SEO',
    title: 'Search clarity',
    description:
      'SEO instruction and content planning grounded in usable workflows.',
    visual: 'dashboard',
  },
  {
    id: 'customer-resolution',
    label: 'Service',
    title: 'Customer resolution',
    description:
      'Complaint handling, case follow-up and service quality across digital channels.',
    visual: 'collaboration',
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: 'hands-on-mentoring',
    label: 'Teaching',
    title: 'Hands-on mentoring',
    description:
      'Tool-based guidance that connects lessons with real marketing projects.',
    visual: 'automation',
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: 'tooling',
    label: 'Stack',
    title: 'Connected tools',
    description:
      'Meta Ads, Analytics, Search Console and classroom-ready workflows.',
    visual: 'integration',
  },
  {
    id: 'quality',
    label: 'Ops',
    title: 'Service quality',
    description:
      'Clear follow-up, case ownership and professional communication standards.',
    visual: 'security',
  },
]

const tools = [
  'Meta Ads Manager',
  'Meta Business Suite',
  'Google Search Console',
  'Google Analytics',
  'Canva',
  'MS Excel',
  'Google Workspace',
]

const caseStudies = [
  {
    id: 'meta-ads',
    index: '01',
    channel: 'Meta Ads',
    title: 'Audience to conversion classroom',
    summary:
      'A teaching loop that walks through Meta campaign setup, audience targeting and creative testing as learners would run it.',
    focus: ['Audience targeting', 'Campaign structure', 'Creative testing'],
    webm: '/case-studies/case-study-meta-ads.webm',
    mp4: '/case-studies/case-study-meta-ads.mp4',
    poster: '/case-studies/case-study-meta-ads.jpg',
  },
  {
    id: 'google-ads',
    index: '02',
    channel: 'Google Ads',
    title: 'Search intent made practical',
    summary:
      'A looped walkthrough of search campaign thinking — keywords, intent and structure — built for classroom clarity.',
    focus: ['Search intent', 'Keyword grouping', 'Account clarity'],
    webm: '/case-studies/case-study-google-ads.webm',
    mp4: '/case-studies/case-study-google-ads.mp4',
    poster: '/case-studies/case-study-google-ads.jpg',
  },
]

function App() {
  const page = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.88,
      touchMultiplier: 1,
    })
    lenisRef.current = lenis

    const updateScrollTrigger = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', updateScrollTrigger)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const anchorHandlers = new Map<HTMLAnchorElement, (event: MouseEvent) => void>()

    page.current?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      const handler = (event: MouseEvent) => {
        const target = anchor.getAttribute('href')
        if (!target) return

        event.preventDefault()
        window.history.pushState(null, '', target)
        lenis.scrollTo(target, {
          duration: 1.35,
          easing: (value) => 1 - Math.pow(1 - value, 4),
        })
      }

      anchor.addEventListener('click', handler)
      anchorHandlers.set(anchor, handler)
    })

    document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      anchorHandlers.forEach((handler, anchor) => {
        anchor.removeEventListener('click', handler)
      })
      lenis.off('scroll', updateScrollTrigger)
      gsap.ticker.remove(updateLenis)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollToExperience = () => {
    window.history.pushState(null, '', '#experience')
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#experience', {
        duration: 1.35,
        easing: (value) => 1 - Math.pow(1 - value, 4),
      })
      return
    }
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadCv = () => {
    const link = document.createElement('a')
    link.href = '/ibrahim-bin-akther-cv.pdf'
    link.download = 'ibrahim-bin-akther-cv.pdf'
    link.click()
  }

  useGSAP(
    () => {
      const motion = gsap.matchMedia()

      motion.add(
        {
          motionOK: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 721px)',
        },
        (context) => {
          const { motionOK, desktop } = context.conditions as {
            motionOK: boolean
            desktop: boolean
          }

          if (!motionOK) return

          const intro = gsap.timeline({
            defaults: { ease: 'power4.out' },
          })

          intro
            .from('.site-header', {
              autoAlpha: 0,
              y: -14,
              duration: 0.9,
            })
            .from(
              '.hero__eyebrow',
              {
                autoAlpha: 0,
                y: 14,
                duration: 0.7,
              },
              '-=0.5',
            )
            .from(
              '.hero h1 span',
              {
                autoAlpha: 0,
                yPercent: 55,
                duration: 1.15,
                stagger: 0.09,
              },
              '-=0.5',
            )
            .from(
              ['.hero__intro', '.hero__actions'],
              {
                autoAlpha: 0,
                y: 22,
                duration: 0.85,
                stagger: 0.12,
              },
              '-=0.68',
            )
            .from(
              '.hero__facts > div',
              {
                autoAlpha: 0,
                y: 18,
                duration: 0.72,
                stagger: 0.07,
              },
              '-=0.48',
            )

          gsap.to('.hero__art', {
            yPercent: desktop ? 16 : 8,
            scale: desktop ? 1.08 : 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          })

          gsap.to('.hero__content', {
            yPercent: desktop ? 13 : 6,
            autoAlpha: 0.18,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: '85% top',
              scrub: 1,
            },
          })

          gsap.from('.profile-card-band__card', {
            autoAlpha: 0,
            y: 56,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.profile-card-band',
              start: 'top 78%',
              once: true,
            },
          })

          gsap.from('.case-studies__intro > *', {
            autoAlpha: 0,
            y: 40,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.case-studies',
              start: 'top 78%',
              once: true,
            },
          })

          gsap.utils.toArray<HTMLElement>('.case-study').forEach((study) => {
            gsap.from(study.querySelectorAll('.case-study__stage, .case-study__copy > *'), {
              autoAlpha: 0,
              y: 48,
              duration: 1.05,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: study,
                start: 'top 78%',
                once: true,
              },
            })

            gsap.to(study.querySelector('.case-study__stage'), {
              yPercent: desktop ? -6 : -3,
              ease: 'none',
              scrollTrigger: {
                trigger: study,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.15,
              },
            })
          })

          gsap.from('.section__heading > *', {
            autoAlpha: 0,
            y: 42,
            duration: 1.05,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.section__heading',
              start: 'top 78%',
              once: true,
            },
          })

          gsap.from('.experience__intro > *', {
            autoAlpha: 0,
            y: 38,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.experience',
              start: 'top 72%',
              once: true,
            },
          })

          gsap.from('.experience__item', {
            autoAlpha: 0,
            y: 44,
            duration: 1,
            stagger: 0.13,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.experience__list',
              start: 'top 76%',
              once: true,
            },
          })

          gsap.from('.expertise', {
            autoAlpha: 0,
            scale: 0.965,
            duration: 1.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.expertise',
              start: 'top 82%',
              once: true,
            },
          })

          gsap.from('.expertise__copy > *, .tool-list', {
            autoAlpha: 0,
            x: desktop ? 42 : 0,
            y: desktop ? 0 : 28,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.expertise',
              start: 'top 68%',
              once: true,
            },
          })

          gsap.to('.expertise__visual', {
            yPercent: desktop ? -9 : -4,
            rotation: desktop ? 6 : 3,
            ease: 'none',
            scrollTrigger: {
              trigger: '.expertise',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.25,
            },
          })

          gsap.from('.education > div', {
            autoAlpha: 0,
            y: 42,
            duration: 1.05,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.education',
              start: 'top 76%',
              once: true,
            },
          })

          gsap.to('.contact__shape', {
            yPercent: -24,
            rotation: 34,
            ease: 'none',
            scrollTrigger: {
              trigger: '.contact',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          })

          gsap.from('.contact > p, .contact h2, .contact__actions', {
            autoAlpha: 0,
            y: 46,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact',
              start: 'top 76%',
              once: true,
            },
          })
        },
        page.current ?? undefined,
      )

      return () => motion.revert()
    },
    { scope: page },
  )

  return (
    <div className="site-shell" ref={page}>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ibrahim Bin Akther, home">
          Ibrahim<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#case-studies">Case studies</a>
          <a href="#experience">Experience</a>
          <a href="#expertise">Expertise</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-contact" href="mailto:musa24bd@gmail.com">
          <span className="header-contact__label">Email</span>
          <span className="header-contact__name" aria-hidden="true">
            Ibrahim
          </span>
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero__art"
            src="/portfolio-atmosphere.jpg"
            alt=""
            width="1536"
            height="864"
            fetchPriority="high"
          />
          <div className="hero__scrim" />
          <div className="hero__content">
            <p className="hero__eyebrow">
              Digital marketing / Operations / Customer experience
            </p>
            <h1 id="hero-title">
              <span>Ibrahim</span>
              <span>Bin Akther</span>
            </h1>
            <p className="hero__intro">
              I teach practical marketing and help service teams turn customer
              needs into clear action.
            </p>
            <div className="hero__actions">
              <SpecularButton
                size="lg"
                radius={999}
                tint="#ffffff"
                tintOpacity={0.08}
                blur={8}
                textColor="#f2f2ee"
                lineColor="#b8efec"
                baseColor="#525252"
                intensity={1}
                idleIntensity={0.4}
                shineSize={10}
                shineFade={34}
                thickness={1.2}
                glow={1}
                followMouse
                proximity={250}
                className="hero__cta"
                onClick={scrollToExperience}
              >
                View experience
              </SpecularButton>
              <SpecularButton
                size="lg"
                radius={999}
                tint="#b8efec"
                tintOpacity={0.12}
                blur={8}
                textColor="#f2f2ee"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={1}
                idleIntensity={0.35}
                shineSize={10}
                shineFade={34}
                thickness={1.2}
                glow={1}
                followMouse
                proximity={250}
                className="hero__cta"
                onClick={downloadCv}
              >
                Download CV
              </SpecularButton>
            </div>
          </div>

          <dl className="hero__facts" aria-label="Profile summary">
            <div>
              <dt>Based in</dt>
              <dd>Dhaka, Bangladesh</dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>Marketing education</dd>
            </div>
            <div>
              <dt>Background</dt>
              <dd>Digital customer service</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>Bangla and English</dd>
            </div>
          </dl>
        </section>

        <section
          className="profile-card-band"
          id="card"
          aria-label="Profile card"
        >
          <div className="profile-card-band__card">
            <GlassmorphismProfileCard
              name="Ibrahim Bin Akther"
              role="Digital Marketing Instructor"
              email="musa24bd@gmail.com"
              avatarSrc="/enhanced_photo.jpg"
              statusText="Available for work"
              statusColor="bg-lime-500"
              glowText="Currently High on Creativity"
            />
          </div>
        </section>

        <section className="case-studies" id="case-studies" aria-labelledby="case-studies-title">
          <div className="case-studies__intro">
            <p className="section__kicker">Case studies</p>
            <h2 id="case-studies-title">Campaign lessons, looping in motion.</h2>
            <p>
              Short silent loops that show how Ibrahim teaches Meta and Google
              Ads — structure, targeting and classroom clarity without the
              slide deck.
            </p>
          </div>

          <div className="case-studies__list">
            {caseStudies.map((study, index) => (
              <article
                className={`case-study${index % 2 === 1 ? ' case-study--flip' : ''}`}
                key={study.id}
              >
                <CaseStudyLoop
                  webm={study.webm}
                  mp4={study.mp4}
                  poster={study.poster}
                  title={study.title}
                />
                <div className="case-study__copy">
                  <p className="case-study__index">
                    <span>{study.index}</span>
                    <span>{study.channel}</span>
                  </p>
                  <h3>{study.title}</h3>
                  <p>{study.summary}</p>
                  <ul aria-label={`${study.channel} focus areas`}>
                    {study.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="profile section" id="profile">
          <div className="section__heading">
            <p className="section__kicker">Profile</p>
            <h2>Marketing that teaches. Service that follows through.</h2>
            <p>
              Ibrahim combines campaign knowledge with frontline customer
              experience, bringing a practical, people-first perspective to
              digital work.
            </p>
          </div>

          <div className="capability-bento" aria-label="Core capabilities">
            <MagicBento
              items={capabilityItems}
              columns={4}
              rowHeight={200}
              gap={12}
              radius={20}
              theme="dark"
              glowColor="#15b8be"
              enableBorderGlow
              enableSpotlight
              spotlightRadius={300}
              clickEffect
              textAutoHide
              intro
            />
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="experience__intro">
            <p>Experience</p>
            <h2>From customer conversations to campaign classrooms.</h2>
          </div>

          <div className="experience__list">
            {experience.map((item) => (
              <article
                className="experience__item"
                key={`${item.company}-${item.period}`}
              >
                <div className="experience__meta">
                  <p>{item.period}</p>
                  <p>{item.company}</p>
                </div>
                <div className="experience__copy">
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="expertise section" id="expertise">
          <div className="expertise__visual" aria-hidden="true">
            <div className="orbital orbital--outer" />
            <div className="orbital orbital--inner" />
            <div className="expertise__core">DM</div>
          </div>

          <div className="expertise__copy">
            <p>Expertise and tools</p>
            <h2>Built around the work, not the buzzwords.</h2>
            <div className="skill-groups">
              <div>
                <h3>Marketing</h3>
                <p>
                  Facebook Ads, SEO, social media marketing, audience
                  targeting, content planning and online strategy.
                </p>
              </div>
              <div>
                <h3>Operations</h3>
                <p>
                  Customer operations, service quality, complaint resolution,
                  case follow-up and team training.
                </p>
              </div>
            </div>
          </div>

          <ul className="tool-list" aria-label="Tools">
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </section>

        <section className="education section">
          <div>
            <p className="education__label">Education</p>
            <h2>B.A. (Honours) in English</h2>
            <p>Bangladesh University of Business &amp; Technology (BUBT)</p>
          </div>
          <div className="education__aside">
            <p>Key strengths</p>
            <ul>
              <li>Clear communication</li>
              <li>Problem-solving</li>
              <li>Training and mentoring</li>
              <li>Customer focus</li>
            </ul>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact__shape" aria-hidden="true" />
          <p>Start a conversation</p>
          <h2>Good work begins with a clear message.</h2>
          <div className="contact__actions">
            <a className="contact__email" href="mailto:musa24bd@gmail.com">
              musa24bd@gmail.com
            </a>
            <a className="contact__phone" href="tel:+8801706175783">
              +880 1706 175783
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>Ibrahim Bin Akther</p>
        <p>Dhaka, Bangladesh</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  )
}

export default App
