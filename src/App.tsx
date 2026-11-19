import './App.css'

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

const capabilities = [
  {
    title: 'Campaign craft',
    body: 'Facebook Ads setup, audience targeting and practical online strategy.',
    className: 'capability capability--wide',
  },
  {
    title: 'Search clarity',
    body: 'SEO instruction and content planning grounded in usable workflows.',
    className: 'capability',
  },
  {
    title: 'Customer resolution',
    body: 'Complaint handling, case follow-up and service quality across digital channels.',
    className: 'capability capability--tall',
  },
  {
    title: 'Hands-on mentoring',
    body: 'Tool-based guidance that connects lessons with real marketing projects.',
    className: 'capability capability--accent',
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

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ibrahim Bin Akther, home">
          Ibrahim<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#profile">Profile</a>
          <a href="#experience">Experience</a>
          <a href="#expertise">Expertise</a>
        </nav>
        <a className="header-contact" href="mailto:musa24bd@gmail.com">
          Email Ibrahim
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
              Ibrahim
              <span>Bin Akther</span>
            </h1>
            <p className="hero__intro">
              I teach practical marketing and help service teams turn customer
              needs into clear action.
            </p>
            <div className="hero__actions">
              <a className="button button--solid" href="#experience">
                View experience
              </a>
              <a
                className="button button--ghost"
                href="/ibrahim-bin-akther-cv.pdf"
                download
              >
                Download CV
              </a>
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

          <div className="capability-grid" aria-label="Core capabilities">
            {capabilities.map((capability) => (
              <article className={capability.className} key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
                <span aria-hidden="true" className="capability__line" />
              </article>
            ))}
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
