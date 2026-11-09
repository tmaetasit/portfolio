import { Fragment, useEffect, useRef, useState, useCallback } from 'react'
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useLang } from './i18n.jsx'
import { Artwork } from './Visuals.jsx'
import { BRAND, CUSTOM } from './brandIcons.jsx'

/* ---------- helpers ---------- */

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useTheme() {
  const toggle = () => {
    const root = document.documentElement
    const current =
      root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    const next = current === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch (e) { /* storage may be blocked */ }
  }
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved)
    } catch (e) { /* ignore */ }
  }, [])
  return toggle
}

function useTypewriter(phrases) {
  const [text, setText] = useState(phrases[0])
  useEffect(() => {
    setText(phrases[0])
    if (reduceMotion()) return undefined
    let i = 0
    let n = phrases[0].length
    let dir = 'hold'
    let timer
    const tick = () => {
      const word = phrases[i]
      if (dir === 'hold') { dir = 'del'; timer = setTimeout(tick, 2600); return }
      if (dir === 'del') {
        n -= 1
        setText(word.slice(0, n))
        if (n <= 0) { dir = 'add'; i = (i + 1) % phrases.length }
        timer = setTimeout(tick, 28)
        return
      }
      const next = phrases[i]
      n += 1
      setText(next.slice(0, n))
      if (n >= next.length) dir = 'hold'
      timer = setTimeout(tick, 52)
    }
    timer = setTimeout(tick, 2600)
    return () => clearTimeout(timer)
  }, [phrases])
  return text
}

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

function Cover({ p }) {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  if (p.cover) return <img src={asset(p.cover)} alt={`${p.title}: ${t.coverAlt}`} loading="lazy" draggable="false" style={p.coverFit ? { objectFit: p.coverFit, objectPosition: 'center', background: '#fbf9fa' } : undefined} />
  return <Artwork kind={p.visual} />
}

function Lightbox({ figures, index, onClose, onMove }) {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = prev }
  }, [onClose, onMove])
  const f = figures[index]
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={f.title} onClick={onClose}>
      <div className="lb-bar" onClick={(e) => e.stopPropagation()}>
        <span className="mono-label">{index + 1} / {figures.length} · {f.title}</span>
        <button ref={closeRef} type="button" className="chip-btn" onClick={onClose}>{t.close}</button>
      </div>
      <img src={asset(f.src)} alt={f.alt || f.title} onClick={(e) => e.stopPropagation()} />
      <div className="lb-nav" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="chip-btn" onClick={() => onMove(-1)}>{t.prev}</button>
        <button type="button" className="chip-btn" onClick={() => onMove(1)}>{t.next}</button>
      </div>
    </div>
  )
}

function CopyButton({ value, label = 'Copy' }) {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch (e) {
      const sel = window.getSelection()
      const el = document.getElementById('email-text')
      if (el && sel) { const r = document.createRange(); r.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(r) }
    }
  }
  return (
    <button type="button" className="chip-btn" onClick={copy} aria-live="polite">
      {done ? t.copied : label}
    </button>
  )
}

/* ---------- navigation ---------- */

const NAV = [{ id: 'work' }, { id: 'what-i-do' }, { id: 'about' }, { id: 'experience' }]

function useGoTo() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return useCallback(
    (id) => {
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' })
      } else {
        navigate('/', { state: { to: id } })
      }
    },
    [pathname, navigate],
  )
}

function Nav() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const toggleTheme = useTheme()
  const goTo = useGoTo()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (pathname !== '/') { setActive(''); return undefined }
    const ids = [...NAV.map((n) => n.id), 'contact']
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [pathname])
  const click = (id) => (e) => { e.preventDefault(); setOpen(false); goTo(id) }
  return (
    <header className="nav-wrap">
      <div className="wrap">
        <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label={t.navAria}>
          <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label={`${PROFILE.name}, ${t.homeAria}`}>
            <span className="mono-mark">{PROFILE.monogram}</span>
            <span className="brand-name">{PROFILE.short.toUpperCase()}</span>
          </Link>
          <ul className={`nav-links${open ? ' open' : ''}`}>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={click(n.id)} className={active === n.id ? 'on' : ''} aria-current={active === n.id ? 'true' : undefined}>{t.nav[n.id]}</a>
              </li>
            ))}
            <li>
              <Link to="/cybersecurity" className={`nav-cyber${pathname === '/cybersecurity' ? ' on' : ''}`} aria-current={pathname === '/cybersecurity' ? 'page' : undefined} onClick={() => setOpen(false)}>
                <ShieldIcon />{t.cyberNav}
              </Link>
            </li>
          </ul>
          <div className="nav-actions">
            <div className="lang-switch" role="group" aria-label={t.langAria}>
              {['th', 'en'].map((l) => (
                <button key={l} type="button" className={lang === l ? 'on' : ''} aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={t.themeAria}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            </button>
            <a href="#contact" className="btn btn-outline btn-sm" onClick={click('contact')}>{t.hireMe}</a>
            <button type="button" className="icon-btn menu-btn" aria-expanded={open} aria-label={t.menu} onClick={() => setOpen(!open)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

/* ---------- sections ---------- */

function Hero() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const typed = useTypewriter(PROFILE.phrases)
  const goTo = useGoTo()
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="status"><span className="pulse" aria-hidden="true" />{PROFILE.status}</p>
          <h1 id="hero-title" className="display">{PROFILE.name.split(' ').map((w, i) => <span key={i}>{i > 0 ? ' ' : ''}<span className="nowrap">{w}</span></span>)}</h1>
          <p className="hero-role">{PROFILE.role}</p>
          <p className="typed" aria-hidden="true">
            <span className="typed-lead">{t.typedLead}</span>
            <span>{typed}</span>
            <span className="caret" />
          </p>
          <p className="sr-only">{PROFILE.phrases.join(' ')}</p>
          <p className="lede">{PROFILE.intro}</p>
          <div className="cta-row">
            <a href="#work" className="btn btn-solid" onClick={(e) => { e.preventDefault(); goTo('work') }}>{t.viewWork}</a>
            <a href="#contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); goTo('contact') }}>{t.getInTouch}</a>
            <CvMenu className="btn btn-ghost" />
          </div>
        </div>
        <figure className="portrait">
          <div className="portrait-frame">
            <img src={asset(PROFILE.photo)} alt={`${t.portraitOf} ${PROFILE.name}`} width="840" height="1120" fetchpriority="high" />
          </div>
          <figcaption>
            <span>{PROFILE.location}</span>
            <span>{t.degreeLine}</span>
          </figcaption>
        </figure>
      </div>
      <ul className="toolbar" aria-label={t.toolsAria}>
        {PROFILE.tools.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <dl className="stats">
        {PROFILE.stats.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Coverflow({ items }) {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const [i, setI] = useState(0)
  const start = useRef(null)
  const dragged = useRef(false)
  const nav = useNavigate()
  const n = items.length
  const go = (d) => setI((v) => (v + d + n) % n)
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }
  const active = items[i]
  return (
    <div>
      <div
        className="cf"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={t.carouselAria}
        onKeyDown={onKey}
        onPointerDown={(e) => { start.current = e.clientX; dragged.current = false }}
        onPointerUp={(e) => {
          if (start.current == null) return
          const dx = e.clientX - start.current
          start.current = null
          if (Math.abs(dx) > 45) { dragged.current = true; go(dx < 0 ? 1 : -1) }
        }}
      >
        <div className="cf-stage">
          {items.map((p, idx) => {
            let o = idx - i
            if (o > n / 2) o -= n
            if (o < -n / 2) o += n
            const a = Math.abs(o)
            const Tag = o === 0 ? Link : 'button'
            return (
              <Tag
                key={p.slug}
                {...(o === 0
                  ? { to: `/projects/${p.slug}`, draggable: false, onClick: (e) => { if (dragged.current) e.preventDefault() }, 'aria-label': `${t.open} ${p.title}` }
                  : { type: 'button', onClick: () => { if (!dragged.current) setI(idx) }, 'aria-label': p.title })}
                className={`cf-card${o === 0 ? ' is-active' : ''}`}
                style={{
                  transform: `translateX(-50%) translateX(${o * 56}%) translateZ(${-a * 150}px) rotateY(${-o * 32}deg)`,
                  opacity: a > 2 ? 0 : 1 - a * 0.3,
                  zIndex: 10 - a,
                  pointerEvents: a > 2 ? 'none' : 'auto',
                }}
                tabIndex={-1}
              >
                <span className="cf-chrome" aria-hidden="true"><i /><i /><i /></span>
                <span className={`cf-art${p.cover ? ' has-img' : ''}`}><Cover p={p} /></span>
                {o === 0 && <span className="cf-open" aria-hidden="true">{t.viewCase}</span>}
              </Tag>
            )
          })}
        </div>
        <button type="button" className="cf-arrow prev" onClick={() => go(-1)} aria-label={t.prevProject}>‹</button>
        <button type="button" className="cf-arrow next" onClick={() => go(1)} aria-label={t.nextProjectAria}>›</button>
      </div>

      <div className="cf-caption" aria-live="polite" role="link" tabIndex={0} onClick={(e) => { if (!e.target.closest('a')) nav(`/projects/${active.slug}`) }} onKeyDown={(e) => { if (e.key === 'Enter' && e.target === e.currentTarget) nav(`/projects/${active.slug}`) }}>
        <p className="mono-label">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {active.org} · {active.period}</p>
        <h3><Link to={`/projects/${active.slug}`}>{active.title}</Link></h3>
        <p>{active.blurb}</p>
        <ul className="tags">{active.tools.map((t) => <li key={t}>{t}</li>)}</ul>
        <Link className="text-link" to={`/projects/${active.slug}`}>{t.viewProject}</Link>
      </div>
      <div className="dots" role="tablist" aria-label={t.chooseProject}>
        {items.map((p, idx) => (
          <button key={p.slug} type="button" role="tab" aria-selected={idx === i} aria-label={p.title}
            className={idx === i ? 'on' : ''} onClick={() => setI(idx)} />
        ))}
      </div>
      {items.some((p) => !p.cover) && (
        <p className="fine">{t.placeholderNote}</p>
      )}
    </div>
  )
}

function Work() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t.workEyebrow}</p>
          <h2 id="work-title">{t.workTitle}</h2>
          <p className="sub">{t.workSub}</p>
        </div>
        <Link to="/projects" className="btn btn-light">{t.allProjects}</Link>
      </div>
      <Coverflow items={PROJECTS} />
    </section>
  )
}

function Abilities() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  return (
    <section id="what-i-do" className="section wrap" aria-labelledby="do-title">
      <p className="eyebrow">{t.doEyebrow}</p>
      <h2 id="do-title">{t.doTitle}</h2>
      <div className="grid-3 grid-abilities">
        {ABILITIES.map((a) => (
          <article key={a.title} className="panel">
            <h3>{a.title}</h3>
            <p>{a.text}</p>
            <ul className="tags">{a.items.map((x) => <li key={x}>{x}</li>)}</ul>
            {a.link && <Link className="text-link ability-link" to={a.link}>{t.abilityLink}</Link>}
          </article>
        ))}
      </div>
    </section>
  )
}


function SkillIcon({ id }) {
  const b = BRAND[id]
  if (b) return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={b.path} fill={b.color} /></svg>
  return CUSTOM[id] || null
}

function CvSkills() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  return (
    <div className="cv-skills">
      {Object.entries(cvIds).map(([g, ids]) => (
        <div key={g}>
          <p className="mono-label">{t.cvGroups[g]}</p>
          <ul className="skill-grid">
            {ids.map((id) => [id, t.cvLabels[id]]).map(([id, label]) => (
              <li key={id} className={`skill${BRAND[id] || id === 'Excel' || id === 'Power BI' ? ' is-brand' : ''}`}>
                <span className="skill-ico"><SkillIcon id={id} /></span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function cvList(PROFILE) {
  return [
    ['data', PROFILE.resumeUrl],
    ['ba', PROFILE.resumeBaUrl],
    ['cyber', PROFILE.resumeCyberUrl],
  ].filter(([, u]) => u)
}

function CvMenu({ className = 'btn btn-outline', align = 'left' }) {
  const { t, D: { PROFILE } } = useLang()
  const ref = useRef(null)
  const items = cvList(PROFILE)
  const [side, setSide] = useState(align)
  // Open toward whichever side has room, so the menu never runs off a phone screen.
  const place = () => {
    const el = ref.current
    if (!el || !el.open) return
    const r = el.getBoundingClientRect()
    const w = Math.min(300, window.innerWidth - 32)
    setSide(r.left + w > window.innerWidth - 16 ? 'right' : 'left')
  }
  useEffect(() => {
    const close = (e) => { if (ref.current && ref.current.open && !ref.current.contains(e.target)) ref.current.open = false }
    const esc = (e) => { if (e.key === 'Escape' && ref.current?.open) { ref.current.open = false; ref.current.querySelector('summary')?.focus() } }
    document.addEventListener('click', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', esc) }
  }, [])
  if (!items.length) return null
  return (
    <details className={`cv-menu cv-${side}`} ref={ref} onToggle={place}>
      <summary className={className}>{t.cvMenu} <span className="cv-caret" aria-hidden="true">▾</span></summary>
      <div className="cv-pop" role="menu" aria-label={t.cvMenuHint}>
        <p className="mono-label">{t.cvMenuHint}</p>
        {items.map(([k, u]) => (
          <a key={k} role="menuitem" href={asset(u)} target="_blank" rel="noreferrer" onClick={() => { if (ref.current) ref.current.open = false }}>
            <span>{t.cvRoles[k]}</span><span aria-hidden="true">PDF ↓</span>
          </a>
        ))}
      </div>
    </details>
  )
}

function About() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  return (
    <section id="about" className="section wrap" aria-labelledby="about-title">
      <p className="eyebrow">{t.aboutEyebrow}</p>
      <h2 id="about-title">{t.aboutTitle}</h2>
      <div className="about">
        <div className="about-id">
          <div className="avatar"><img className="avatar-img" src={asset(PROFILE.photo)} alt={`${t.portraitOf} ${PROFILE.name}`} width="840" height="1120" loading="lazy" /></div>
          <p className="about-name">{PROFILE.name}</p>
          <p className="muted">{PROFILE.role}</p>
        </div>
        <div className="about-copy">
          {PROFILE.about.map((t) => <p key={t}>{t}</p>)}
          <p className="cv-inline">{t.wantDetails}{cvList(PROFILE).map(([k, u], i) => (
            <Fragment key={k}>{i > 0 && <span aria-hidden="true"> · </span>}<a className="text-link" href={asset(u)} target="_blank" rel="noreferrer">{t.cvRoles[k]}</a></Fragment>
          ))}</p>
          <ul className="now" aria-label={t.currently}>
            {PROFILE.currently.map((c) => (
              <li key={c.k}>
                <span className="mono-label">{c.k}</span>
                <span>{c.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CvSkills />
    </section>
  )
}

function Experience() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  return (
    <section id="experience" className="section wrap" aria-labelledby="exp-title">
      <p className="eyebrow">{t.expEyebrow}</p>
      <h2 id="exp-title">{t.expTitle}</h2>
      <ol className="timeline">
        {EXPERIENCE.map((e) => (
          <li key={e.org}>
            <p className="mono-label">{e.period}</p>
            <h3>{e.org}</h3>
            <p className="role">{e.role}</p>
            <ul className="points">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </li>
        ))}
        <li>
          <p className="mono-label">{EDUCATION.period}</p>
          <h3>{EDUCATION.org}</h3>
          <p className="role">{EDUCATION.role}</p>
        </li>
      </ol>
    </section>
  )
}

function Contact() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  return (
    <section id="contact" className="section wrap contact" aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">{t.contactEyebrow}</p>
        <p className="status"><span className="pulse" aria-hidden="true" />{PROFILE.status}</p>
        <h2 id="contact-title" className="display-sm">{t.contactTitle}</h2>
        <p className="lede">{t.contactLede}</p>
        <CvMenu className="btn btn-light" />
      </div>
      <div className="contact-cards">
        <div className="panel contact-card">
          <span className="mono-label">{t.email}</span>
          <span id="email-text" className="selectable">{PROFILE.email}</span>
          <div className="contact-actions">
            <CopyButton value={PROFILE.email} label={t.copyEmail} />
          </div>
        </div>
        <a className="panel contact-card link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
          <span className="mono-label">LinkedIn</span>
          <span>maetasit-pittatanang ↗</span>
        </a>
        {PROFILE.github && (
          <a className="panel contact-card link" href={PROFILE.github} target="_blank" rel="noreferrer">
            <span className="mono-label">GitHub</span>
            <span>{PROFILE.github.replace('https://github.com/', '')} ↗</span>
          </a>
        )}
      </div>
    </section>
  )
}

function Footer() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  return (
    <footer className="footer wrap">
      <span>© 2026 {PROFILE.name}</span>
      <span className="footer-links">
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        {PROFILE.github && <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>}
      </span>
      <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' }) }}>{t.backToTop}</a>
    </footer>
  )
}

/* ---------- pages ---------- */

function Home() {
  const { state } = useLocation()
  useEffect(() => {
    if (state?.to) {
      const t = setTimeout(() => document.getElementById(state.to)?.scrollIntoView({ block: 'start' }), 30)
      return () => clearTimeout(t)
    }
    return undefined
  }, [state])
  return (
    <main>
      <Hero />
      <Work />
      <Abilities />
      <About />
      <Experience />
      <Contact />
    </main>
  )
}

function Archive() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const [cat, setCat] = useState('all')
  const list = PROJECTS.filter((p) => cat === 'all' || p.category === cat)
  return (
    <main className="wrap page">
      <p className="eyebrow">{t.archiveEyebrow}</p>
      <h1 className="display-sm">{t.archiveTitle}</h1>
      <p className="sub">{t.archiveSub}</p>
      <div className="tabs" role="tablist" aria-label={t.filterAria}>
        {CATEGORIES.map((c) => (
          <button key={c.id} type="button" role="tab" aria-selected={cat === c.id}
            className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)}>{c.label}</button>
        ))}
      </div>
      <ul className="archive">
        {list.map((p) => (
          <li key={p.slug}>
            <Link to={`/projects/${p.slug}`} className="archive-row">
              <div>
                <h2 className="archive-title">{p.title}</h2>
                <p>{p.blurb}</p>
                <ul className="tags">{p.tools.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <span className="mono-label">{p.org}<br />{p.period}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

const STAR_LABELS = [['S', 'situation'], ['T', 'task'], ['A', 'action'], ['R', 'result']]

const fmt = new Intl.NumberFormat('en-US')

function Star({ star }) {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  return (
    <div className="star">
      {STAR_LABELS.map(([letter, key]) => {
        const label = t.star[key]
        const v = star[key]
        return (
          <section key={key} className={`star-card star-${key}`} aria-labelledby={`star-${key}`}>
            <header>
              <span className="star-letter" aria-hidden="true">{letter}</span>
              <h2 id={`star-${key}`} className="star-h">{label}</h2>
            </header>
            {Array.isArray(v) ? (
              <ul className="points flow">{v.map((t) => <li key={t}>{t}</li>)}</ul>
            ) : (
              <p>{v}</p>
            )}
          </section>
        )
      })}
    </div>
  )
}

function BarRow({ label, value, max, text, client }) {
  return (
    <li className={`bar-row${client ? ' is-client' : ''}`}>
      <span className="bar-label">{label}</span>
      <span className="bar-track" aria-hidden="true"><span className="bar-fill" style={{ width: `${Math.max(2, (value / max) * 100)}%` }} /></span>
      <span className="bar-value">{text}</span>
    </li>
  )
}

function Compare({ data }) {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const maxPosts = Math.max(...data.brands.map((b) => b.posts))
  const maxFollowers = Math.max(...data.brands.map((b) => b.followers))
  return (
    <section className="compare" aria-labelledby="cmp-title">
      <h2 id="cmp-title" className="h-sm">{t.cmpTitle}</h2>
      <p className="muted cmp-sub">{t.cmpSub}{data.period}</p>
      <div className="cmp-charts">
        <figure>
          <figcaption className="mono-label">{t.cmpPosts}</figcaption>
          <ul className="bars">
            {data.brands.map((b) => (
              <BarRow key={b.name} label={b.name} value={b.posts} max={maxPosts} text={fmt.format(b.posts)} client={b.role === 'client'} />
            ))}
          </ul>
        </figure>
        <figure>
          <figcaption className="mono-label">{t.cmpFollowers}</figcaption>
          <ul className="bars">
            {data.brands.map((b) => (
              <BarRow key={b.name} label={b.name} value={b.followers} max={maxFollowers} text={fmt.format(b.followers)} client={b.role === 'client'} />
            ))}
          </ul>
        </figure>
      </div>
      <h3 className="h-sm cmp-brands-title">{t.cmpBrands}</h3>
      <div className="brand-blocks">
        {data.brands.map((b) => (
          <article key={b.name} className={`brand-block${b.role === 'client' ? ' is-client' : ''}`}>
            <figure>
              <img src={asset(b.img)} alt={`${b.name}: ${t.brandAlt}`} loading="lazy" />
            </figure>
            <div className="brand-text">
              <p className="mono-label">{b.role === 'client' ? t.client : t.competitor}</p>
              <h4>{b.name}</h4>
              <div className="brand-cols">
                <div>
                  <p className="mono-label brand-sub">{t.chartsShow}</p>
                  <ul className="points flow">{b.summary.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <div>
                  <p className="mono-label brand-sub">{t.contentHabits}</p>
                  <ul className="points flow">{b.notes.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {data.avg && (
        <article className="brand-block avg">
          <figure><img src={asset(data.avg.img)} alt={t.avgAlt} loading="lazy" /></figure>
          <div className="brand-text">
            <p className="mono-label">{t.allFour}</p>
            <h4>{t.avgEngagement}</h4>
            <ul className="points flow">{data.avg.points.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </article>
      )}
    </section>
  )
}

function StudyPage({ p, next }) {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const [open, setOpen] = useState(null)
  const figs = p.figures || []
  const move = useCallback((d) => setOpen((v) => (v == null ? v : (v + d + figs.length) % figs.length)), [figs.length])
  const close = useCallback(() => setOpen(null), [])
  return (
    <main className="wrap page">
      <Link to="/" state={{ to: 'work' }} className="back-btn">{t.backGallery}</Link>
      <p className="eyebrow top-gap">{p.org} · {p.period}</p>
      <h1 className="display-sm">{p.title}</h1>
      <p className="lede">{p.blurb}</p>
      <ul className="tags">{p.tools.map((t) => <li key={t}>{t}</li>)}</ul>

      <Star star={p.star} />

      {p.compare && <Compare data={p.compare} />}

      {figs.length > 0 && (
        <>
          <h2 className="h-sm fig-title">{t.theWork}</h2>
          <div className="figs">
            {figs.map((f, i) => (
              <figure key={f.src} className="fig">
                <button type="button" className="fig-img" onClick={() => setOpen(i)} aria-label={`${t.enlargeAria}: ${f.title}`}>
                  <img src={asset(f.src)} alt={f.title} loading="lazy" />
                  <span className="fig-zoom" aria-hidden="true">{t.enlarge}</span>
                </button>
                <figcaption>
                  <strong>{f.title}</strong>
                  <span>{f.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}

      {p.extras && (
        <div className="story">
          {p.extras.map((x) => (
            <section key={x.title}>
              <h2 className="h-sm">{x.title}</h2>
              <ul className="points flow">{x.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </section>
          ))}
        </div>
      )}

      <div className="case-next">
        <span className="muted">{t.nextProject}</span>
        <Link className="text-link" to={`/projects/${next.slug}`}>{next.title} →</Link>
      </div>
      {open != null && <Lightbox figures={figs} index={open} onClose={close} onMove={move} />}
    </main>
  )
}

// Renders `code` spans written with backticks in content strings.
function Inline({ text }) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : <span key={i}>{part}</span>,
  )
}

function DataTable({ columns, rows, stack = false, caption }) {
  return (
    <div className={`table-scroll${stack ? ' stack' : ''}`} role="region" aria-label={caption} tabIndex={0}>
      <table className="data-table">
        <thead>
          <tr>{columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} data-label={columns[j]}><Inline text={cell} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PdpaPage({ p, next }) {
  const { t } = useLang()
  const [open, setOpen] = useState(null)
  const figs = p.screenshots
  const L = p.labels
  const move = useCallback((d) => setOpen((v) => (v == null ? v : (v + d + figs.length) % figs.length)), [figs.length])
  const close = useCallback(() => setOpen(null), [])
  return (
    <main className="wrap page pdpa">
      <Link to="/" state={{ to: 'work' }} className="back-btn">{t.backGallery}</Link>

      <header className="pdpa-hero">
        <p className="eyebrow top-gap">{p.eyebrow} · {p.period}</p>
        <h1 className="display-sm">{p.title}</h1>
        <p className="lede">{p.tagline}</p>
        <ul className="tags">{p.tools.map((x) => <li key={x}>{x}</li>)}</ul>
        <div className="cta-row">
          <a className="btn btn-solid" href={p.githubUrl} target="_blank" rel="noreferrer">{L.github}</a>
          {p.demoUrl && <a className="btn btn-outline" href={p.demoUrl} target="_blank" rel="noreferrer">{L.demo}</a>}
        </div>
        <ul className="pdpa-badges">
          {p.badges.map((b) => <li key={b}><ShieldIcon size={14} />{b}</li>)}
        </ul>
      </header>

      <section className="pdpa-sec" aria-labelledby="pdpa-results">
        <h2 id="pdpa-results" className="h-sm">{L.results}</h2>
        <div className="pdpa-results">
          {p.results.map((r) => (
            <div key={r.label} className="panel pdpa-result">
              <span className="pdpa-num">{r.value}</span>
              <strong>{r.label}</strong>
              <span className="muted">{r.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pdpa-sec" aria-labelledby="pdpa-problem">
        <h2 id="pdpa-problem" className="h-sm">{L.problem}</h2>
        <div className="flow pdpa-prose">
          {p.problem.map((x, i) => (
            <Fragment key={x}>
              <p>{x}</p>
              {i === 1 && p.routes && <ol className="pdpa-routes">{p.routes.map((r) => <li key={r}>{r}</li>)}</ol>}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="pdpa-sec" aria-labelledby="pdpa-arch">
        <h2 id="pdpa-arch" className="h-sm">{L.architecture}</h2>
        <figure className="fig pdpa-arch">
          <button type="button" className="fig-img" onClick={() => setOpen(-1)} aria-label={`${t.enlargeAria}: ${L.archAlt}`}>
            <img src={asset(p.architecture.img)} alt={p.architecture.alt} loading="lazy" />
            <span className="fig-zoom" aria-hidden="true">{t.enlarge}</span>
          </button>
          <figcaption><span>{p.architecture.caption}</span></figcaption>
        </figure>
        <DataTable columns={p.architecture.columns} rows={p.architecture.rows} caption={L.archTable} />
      </section>

      <section className="pdpa-sec" aria-labelledby="pdpa-build">
        <h2 id="pdpa-build" className="h-sm">{L.build}</h2>
        <p className="pdpa-prose pdpa-build-intro">{p.build.intro}</p>
        <ol className="pdpa-steps">
          {p.build.steps.map((st, i) => (
            <li key={i} className="pdpa-step">
              <span className="pdpa-step-day mono-label">{st.day}</span>
              <div className="panel pdpa-step-card">
                <h3>{st.title}</h3>
                <p className="pdpa-step-simple"><strong>{L.simple}:</strong> {st.simple}</p>
                <details>
                  <summary>{L.details}</summary>
                  <ul className="points flow">{st.items.map((x) => <li key={x}><Inline text={x} /></li>)}</ul>
                </details>
                <p className="pdpa-step-result"><span className="mono-label">{L.outcome}</span>{st.result}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pdpa-sec" aria-labelledby="pdpa-sev">
        <h2 id="pdpa-sev" className="h-sm">{L.severity}</h2>
        <DataTable columns={p.severity.columns} rows={p.severity.rows} caption={L.sevTable} />
        <p className="muted pdpa-note">{p.severity.note}</p>
      </section>

      <section className="pdpa-sec" aria-labelledby="pdpa-solved">
        <h2 id="pdpa-solved" className="h-sm">{L.problems}</h2>
        <DataTable columns={p.problems.columns} rows={p.problems.rows} stack caption={L.probTable} />
      </section>

      <section className="pdpa-sec" aria-labelledby="pdpa-shots">
        <h2 id="pdpa-shots" className="h-sm">{L.screenshots}</h2>
        <div className="figs">
          {figs.map((f, i) => (
            <figure key={f.src} className="fig">
              <button type="button" className="fig-img" onClick={() => setOpen(i)} aria-label={`${t.enlargeAria}: ${f.title}`}>
                <img src={asset(f.src)} alt={f.alt} loading="lazy" />
                <span className="fig-zoom" aria-hidden="true">{t.enlarge}</span>
              </button>
              <figcaption>
                <strong>{f.title}</strong>
                <span>{f.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="pdpa-sec pdpa-two" aria-labelledby="pdpa-monitor">
        <div>
          <h2 id="pdpa-monitor" className="h-sm">{L.monitor}</h2>
          <p className="pdpa-prose">{p.monitorMode}</p>
        </div>
        <div>
          <h2 className="h-sm">{L.standards}</h2>
          <p className="mono-label pdpa-std-label">ISO/IEC 27001:2022 Annex A</p>
          <ul className="pdpa-std">
            {p.iso.map(([id, name, how]) => (
              <li key={id}><code>{id}</code><span><strong>{name}</strong> <span className="muted">· {how}</span></span></li>
            ))}
          </ul>
          <p className="mono-label pdpa-std-label">MITRE ATT&amp;CK</p>
          <ul className="pdpa-std">
            {p.mitre.map(([id, name]) => <li key={id}><code>{id}</code><span>{name}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="pdpa-sec" aria-labelledby="pdpa-next">
        <h2 id="pdpa-next" className="h-sm">{L.next}</h2>
        <ul className="points flow">{p.next.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <div className="case-next">
        <span className="muted">{t.nextProject}</span>
        <Link className="text-link" to={`/projects/${next.slug}`}>{next.title} →</Link>
      </div>
      {open != null && (
        <Lightbox
          figures={open === -1 ? [{ src: p.architecture.img, title: L.archAlt, alt: p.architecture.alt }] : figs}
          index={open === -1 ? 0 : open}
          onClose={close}
          onMove={open === -1 ? () => {} : move}
        />
      )}
    </main>
  )
}

function OlistPage({ p, next }) {
  const { t } = useLang()
  const L = p.labels
  const [open, setOpen] = useState(null)
  const [videoOk, setVideoOk] = useState(Boolean(p.links.video))
  const figs = [
    ...p.findings.map((f) => ({ src: f.img, title: f.title, note: f.text, alt: f.alt })),
    ...p.dashboard,
    ...p.design.map((d) => ({ ...d, note: '' })),
  ]
  const nF = p.findings.length
  const nD = p.dashboard.length
  const move = useCallback((d) => setOpen((v) => (v == null ? v : (v + d + figs.length) % figs.length)), [figs.length])
  const close = useCallback(() => setOpen(null), [])
  const Thumb = ({ i, src, alt, label }) => (
    <button type="button" className="fig-img" onClick={() => setOpen(i)} aria-label={`${t.enlargeAria}: ${label}`}>
      <img src={asset(src)} alt={alt} loading="lazy" />
      <span className="fig-zoom" aria-hidden="true">{t.enlarge}</span>
    </button>
  )
  return (
    <main className="wrap page olist">
      <Link to="/" state={{ to: 'work' }} className="back-btn">{t.backGallery}</Link>

      <header className="olist-hero">
        <p className="eyebrow top-gap">{L.eyebrow}</p>
        <h1 className="display-sm">{p.title}</h1>
        <p className="lede">{p.subtitle}</p>
        <p className="olist-honesty">{p.honesty}</p>
        <dl className="olist-meta">
          <div><dt className="mono-label">{L.role}</dt><dd>{p.role}</dd></div>
          <div><dt className="mono-label">{L.data}</dt><dd>{p.data}</dd></div>
        </dl>
        <ul className="tags">{p.allTools.map((x) => <li key={x}>{x}</li>)}</ul>
        <div className="cta-row">
          <a className="btn btn-solid" href={p.links.github} target="_blank" rel="noreferrer">{L.github}</a>
          <a className="btn btn-outline" href={p.links.data} target="_blank" rel="noreferrer">{L.dataset}</a>
        </div>
      </header>

      <section className="olist-kpis" aria-label="Key numbers">
        {p.kpis.map((k) => (
          <div key={k.value} className="panel olist-kpi">
            <span className="olist-num">{k.value}</span>
            <span>{k.label}</span>
          </div>
        ))}
      </section>

      {videoOk && (
        <section className="olist-sec" aria-labelledby="olist-video">
          <h2 id="olist-video" className="h-sm">{L.video}</h2>
          <video className="olist-video" controls preload="metadata" poster={asset(p.links.poster)} onError={() => setVideoOk(false)}>
            <source src={asset(p.links.video)} type="video/mp4" onError={() => setVideoOk(false)} />
          </video>
        </section>
      )}

      <section className="olist-sec" aria-labelledby="olist-problem">
        <h2 id="olist-problem" className="h-sm">{L.problem}</h2>
        <p className="olist-prose">{p.problem}</p>
      </section>

      <section className="olist-sec" aria-labelledby="olist-approach">
        <h2 id="olist-approach" className="h-sm">{L.approach}</h2>
        <ol className="olist-steps">
          {p.workstreams.map((w) => (
            <li key={w.id} className="panel olist-step">
              <span className="olist-step-id mono-label">{w.id}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ol>
        <p className="mono-label olist-art-label">{L.artefacts}</p>
        <ul className="tags">{p.artefacts.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <section className="olist-sec" aria-labelledby="olist-build">
        <h2 id="olist-build" className="h-sm">{L.build}</h2>
        <p className="olist-prose pdpa-build-intro">{p.build.intro}</p>
        <ol className="pdpa-steps">
          {p.build.steps.map((st, i) => (
            <li key={i} className="pdpa-step">
              <span className="pdpa-step-day mono-label">{st.day}</span>
              <div className="panel pdpa-step-card">
                <h3>{st.title}</h3>
                <p className="pdpa-step-simple"><strong>{L.simple}:</strong> {st.simple}</p>
                <details>
                  <summary>{L.details}</summary>
                  <ul className="points flow">{st.items.map((x) => <li key={x}><Inline text={x} /></li>)}</ul>
                </details>
                <p className="pdpa-step-result"><span className="mono-label">{L.outcome}</span>{st.result}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="olist-sec" aria-labelledby="olist-findings">
        <h2 id="olist-findings" className="h-sm">{L.findings}</h2>
        <ol className="olist-findings">
          {p.findings.map((f, i) => (
            <li key={f.img} className="olist-finding">
              <div className="olist-finding-text">
                <span className="olist-finding-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
              <figure className="fig"><Thumb i={i} src={f.img} alt={f.alt} label={f.title} /></figure>
            </li>
          ))}
        </ol>
      </section>

      <section className="olist-sec" aria-labelledby="olist-dash">
        <h2 id="olist-dash" className="h-sm">{L.dashboard}</h2>
        <div className="olist-gallery">
          {p.dashboard.map((d, j) => (
            <figure key={d.src} className="fig">
              <Thumb i={nF + j} src={d.src} alt={d.alt} label={d.title} />
              <figcaption><strong>{d.title}</strong><span>{d.note}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="olist-sec" aria-labelledby="olist-rec">
        <h2 id="olist-rec" className="h-sm">{L.recommendation}</h2>
        <ol className="olist-rec">{p.recommendation.map((x) => <li key={x}>{x}</li>)}</ol>
      </section>

      <section className="olist-sec" aria-labelledby="olist-design">
        <h2 id="olist-design" className="h-sm">{L.design}</h2>
        <div className="olist-gallery olist-gallery-sm">
          {p.design.map((d, j) => (
            <figure key={d.src} className="fig">
              <Thumb i={nF + nD + j} src={d.src} alt={d.alt} label={d.title} />
              <figcaption><strong>{d.title}</strong></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="olist-sec" aria-labelledby="olist-learned">
        <h2 id="olist-learned" className="h-sm">{L.learned}</h2>
        <blockquote className="olist-quote">{p.learned}</blockquote>
      </section>

      <section className="olist-sec" aria-labelledby="olist-ai">
        <h2 id="olist-ai" className="h-sm">{L.ai}</h2>
        <ul className="points flow olist-ai">{p.ai.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <div className="case-next">
        <span className="muted">{t.nextProject}</span>
        <Link className="text-link" to={`/projects/${next.slug}`}>{next.title} →</Link>
      </div>
      {open != null && <Lightbox figures={figs} index={open} onClose={close} onMove={move} />}
    </main>
  )
}

function NotFound({ title }) {
  const { t } = useLang()
  return (
    <main className="wrap page not-found">
      <p className="eyebrow">404</p>
      <h1 className="display-sm">{title || t.pageNotFound}</h1>
      <p className="lede">{t.notFoundText}</p>
      <div className="cta-row">
        <Link className="btn btn-solid" to="/">{t.goHome}</Link>
        <Link className="btn btn-outline" to="/projects">{t.backAll}</Link>
      </div>
    </main>
  )
}

function usePageTitle() {
  const { t, lang, D: { PROFILE, PROJECTS } } = useLang()
  const { pathname } = useLocation()
  useEffect(() => {
    let page
    if (pathname === '/') page = t.titles.home
    else if (pathname === '/projects') page = t.titles.projects
    else if (pathname === '/cybersecurity') page = t.titles.cyber
    else if (pathname.startsWith('/projects/')) page = PROJECTS.find((p) => `/projects/${p.slug}` === pathname)?.title || t.titles.notFound
    else page = t.titles.notFound
    document.title = pathname === '/' ? `${PROFILE.name} | ${page}` : `${page} | ${PROFILE.name}`
  }, [pathname, lang])
}

function CaseStudy() {
  const { t, lang, setLang, cvIds, D: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } } = useLang()
  const { slug } = useParams()
  const idx = PROJECTS.findIndex((p) => p.slug === slug)
  const p = PROJECTS[idx]
  if (!p) {
    return (
      <NotFound title={t.notFound} />
    )
  }
  const next = PROJECTS[(idx + 1) % PROJECTS.length]
  if (p.layout === 'pdpa') return <PdpaPage p={p} next={next} />
  if (p.layout === 'olist') return <OlistPage p={p} next={next} />
  if (p.star) return <StudyPage p={p} next={next} />
  const steps = [
    ['Problem', 'What the business needed to know or decide.'],
    ['Approach', 'How the data was prepared and which method or tool was used.'],
    ['Insight', 'What the analysis showed.'],
    ['Impact', 'What changed, or what the team could do next.'],
  ]
  return (
    <main className="wrap page">
      <Link to="/" state={{ to: 'work' }} className="back-btn">{t.backGallery}</Link>
      <p className="eyebrow top-gap">{p.org} · {p.period}</p>
      <h1 className="display-sm">{p.title}</h1>
      <p className="lede">{p.blurb}</p>
      <ul className="tags">{p.tools.map((t) => <li key={t}>{t}</li>)}</ul>

      <div className="case-art panel"><Artwork kind={p.visual} /></div>

      <div className="case-grid">
        {steps.map(([h, hint]) => (
          <article key={h} className="panel">
            <h3>{h}</h3>
            <p className="placeholder">{hint} <em>To be written from your PDF.</em></p>
          </article>
        ))}
      </div>

      <div className="pdf-slot">
        <p className="mono-label">Full report</p>
        <p>Your PDF will be embedded here with a download button.</p>
      </div>

      <div className="case-next">
        <span className="muted">{t.nextProject}</span>
        <Link className="text-link" to={`/projects/${next.slug}`}>{next.title} →</Link>
      </div>
    </main>
  )
}

function ShieldIcon({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function CyberPage() {
  const { D: { CYBER: c, PROFILE, PROJECTS } } = useLang()
  const goTo = useGoTo()
  const lab = PROJECTS.find((p) => p.slug === 'pdpa-leak-detection-lab')
  return (
    <main className="wrap page cyber">
      <section className="cyber-hero" aria-labelledby="cyber-title">
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 id="cyber-title" className="display-sm">{c.title}</h1>
          <p className="hero-role">{c.role}</p>
          <p className="lede">{c.intro}</p>
          <ul className="tags cyber-traits">{c.traits.map((x) => <li key={x}>{x}</li>)}</ul>
          <div className="cta-row">
            {PROFILE.resumeCyberUrl && <a className="btn btn-solid" href={asset(PROFILE.resumeCyberUrl)} target="_blank" rel="noreferrer">{c.resume}</a>}
            {PROFILE.github && <a className="btn btn-outline" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
          </div>
        </div>
        <div className="cyber-badge" aria-hidden="true">
          <ShieldIcon size={120} />
          <span className="mono-label">CIA · DLP · EDR</span>
        </div>
      </section>

      {lab && (
        <section className="section-tight" aria-labelledby="cyber-project">
          <h2 id="cyber-project" className="h-sm">{c.projectTitle}</h2>
          <article className="panel cyber-project">
            <Link to={`/projects/${lab.slug}`} className="cyber-project-img" aria-label={lab.title}>
              <img src={asset(lab.cover)} alt={lab.architecture.alt} loading="lazy" />
            </Link>
            <div className="cyber-project-body">
              <p className="mono-label">{lab.org} · {lab.period}</p>
              <h3>{lab.title}</h3>
              <p className="muted">{lab.tagline}</p>
              <dl className="cyber-project-stats">
                {lab.results.map((r) => (
                  <div key={r.value}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="tags">{lab.tools.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="cta-row">
                <Link className="btn btn-solid" to={`/projects/${lab.slug}`}>{c.projectRead}</Link>
                <a className="btn btn-outline" href={lab.githubUrl} target="_blank" rel="noreferrer">{c.projectGithub}</a>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="section-tight" aria-labelledby="cyber-skills">
        <h2 id="cyber-skills" className="h-sm">{c.skillsTitle}</h2>
        <p className="muted cyber-sub">{c.skillsSub}</p>
        <div className="cyber-skills">
          {c.skills.map((g) => (
            <div key={g.group}>
              <p className="mono-label">{g.group}</p>
              <ul className="tags">{g.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight" aria-labelledby="cyber-tools">
        <h2 id="cyber-tools" className="h-sm">{c.toolsTitle}</h2>
        <p className="muted cyber-sub">{c.toolsSub}</p>
        <div className="cyber-tools">
          {c.tools.map((x) => (
            <article key={x.name} className="panel cyber-tool">
              <p className="mono-label">{x.kind}</p>
              <h3>{x.name}{x.vendor && <span className="cyber-vendor"> · {x.vendor}</span>}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-tight" aria-labelledby="cyber-path">
        <h2 id="cyber-path" className="h-sm">{c.pathTitle}</h2>
        <ol className="cyber-path">
          {c.path.map((s) => (
            <li key={s.step} className="panel">
              <span className="cyber-step mono-label">{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel cyber-cta" aria-labelledby="cyber-cta">
        <div>
          <h2 id="cyber-cta" className="h-sm">{c.ctaTitle}</h2>
          <p className="muted">{c.ctaText}</p>
        </div>
        <div className="cta-row">
          <a href="#contact" className="btn btn-solid" onClick={(e) => { e.preventDefault(); goTo('contact') }}>{c.ctaContact}</a>
          {PROFILE.resumeCyberUrl && <a className="btn btn-outline" href={asset(PROFILE.resumeCyberUrl)} target="_blank" rel="noreferrer">{c.resume}</a>}
          <a className="btn btn-outline" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>
      <Link to="/" className="back-btn cyber-back">{c.ctaBack}</Link>
    </main>
  )
}

function Progress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      const v = h > 0 ? Math.min(1, window.scrollY / h) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${v})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return <div className="progress" ref={ref} aria-hidden="true" />
}

function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return undefined
    const move = (e) => {
      const el = e.target.closest?.('.panel, .star-card')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])
}

function ScrollTop() {
  const { pathname, state } = useLocation()
  useEffect(() => { if (!state?.to) window.scrollTo(0, 0) }, [pathname, state])
  return null
}

export default function App() {
  const { t } = useLang()
  const { pathname } = useLocation()
  useSpotlight()
  usePageTitle()
  return (
    <>
      <Progress />
      <a href="#main-skip" className="skip" onClick={(e) => { e.preventDefault(); const m = document.querySelector('main'); m?.setAttribute('tabindex', '-1'); m?.focus() }}>{t.skip}</a>
      <ScrollTop />
      <Nav />
      <div key={pathname} className="route">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Archive />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/cybersecurity" element={<CyberPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
