"use client";

import { useState } from "react";
import portfolio from "./data/portfolio";
import { ProjectsSection } from "./_components/ProjectsSection";
import { Badge, Container, NeoButton, NeoCard, Pill, SectionHeader } from "./_components/neo";
import { cx } from "./_components/cx";
import { ExperienceTimeline } from "./_components/ExperienceTimeline";
import Image from 'next/image';

function getSkillBadgeClass(skill: string) {
  const s = skill.toLowerCase();
  if (s.includes("html")) return "bg-[var(--neo-coral)] text-black";
  if (s.includes("css") && !s.includes("tailwind")) return "bg-[var(--neo-sky)] text-black";
  if (s.includes("javascript") || s.includes("js")) {
    if (s.includes("node")) return "bg-[var(--neo-mint)] text-black";
    if (s.includes("next")) return "bg-[var(--neo-sky)] text-black";
    if (s.includes("inertia")) return "bg-[var(--neo-sky)] text-black";
    return "bg-[var(--neo-sun)] text-black";
  }
  if (s.includes("react")) return "bg-[var(--neo-sky)] text-black";
  if (s.includes("vue")) return "bg-[var(--neo-mint)] text-black";
  if (s.includes("php")) return "bg-[var(--neo-peach)] text-black";
  if (s.includes("laravel")) return "bg-[var(--neo-coral)] text-black";
  if (s.includes("express")) return "bg-[var(--neo-peach)] text-black";
  if (s.includes("mysql") || s.includes("postgres")) return "bg-[var(--neo-paper)] text-black";
  if (s.includes("tailwind")) return "bg-[var(--neo-night)] text-white";
  if (s.includes("bootstrap")) return "bg-[var(--neo-peach)] text-black";
  if (s.includes("supabase")) return "bg-[var(--neo-sun)] text-black";
  if (s.includes("git")) return "bg-[var(--neo-sun)] text-black";
  if (s.includes("figma")) return "bg-[var(--neo-coral)] text-black";
  return "bg-[var(--neo-paper)] text-black";
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const nav = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#org", label: "Org" },
    { href: "#certificates", label: "Certificate" },
    { href: "#contact", label: "Contact" },
  ];

  const marquee = [...portfolio.skills.marquee, ...portfolio.skills.marquee];

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b-3 border-black/90 bg-[var(--neo-cream)]">
        <Container className="flex h-16 items-center justify-between gap-4">
          {/* Hamburger Button for Mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="neo-border neo-shadow neo-press inline-flex h-10 w-10 items-center justify-center bg-[var(--neo-sun)] text-black md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const isActive = item.label === "Home";
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "neo-border neo-press rounded-none px-3 py-2 text-xs font-mono font-black uppercase tracking-wider transition-all",
                    isActive
                      ? "bg-[var(--neo-sun)] text-black neo-shadow"
                      : "bg-[var(--neo-paper)] text-black hover:bg-black/5"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <NeoButton href={portfolio.links.cv} className="px-4 py-2 text-xs font-black">
            Download CV <span aria-hidden>+</span>
          </NeoButton>
        </Container>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="neo-border border-x-0 border-b-3 bg-[var(--neo-paper)] md:hidden">
            <Container className="flex flex-col gap-2 py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="neo-border neo-press rounded-none bg-[var(--neo-paper)] px-4 py-3 text-sm font-mono font-black uppercase tracking-wider text-center transition-all hover:bg-black/5"
                >
                  {item.label}
                </a>
              ))}
            </Container>
          </div>
        )}
      </header>

      <main id="home">  
        <section className="border-b-3 border-black/90 bg-[var(--neo-mint)]">
          <Container className="py-10 sm:py-12">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_0.7fr]">
              <div className="flex flex-col items-center md:items-start text-center md:text-left ">
                {portfolio.person.availableForWork ? (
                  <Pill className="bg-[var(--neo-sun)] text-black">Available for work</Pill>
                ) : (
                  <Pill>Not available</Pill>
                )}

                <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl flex flex-col gap-2 items-center md:items-start">
                  <span>{portfolio.person.name.split(" ")[0]}</span>
                  <span>{portfolio.person.name.split(" ")[1]}</span>
                  <span className="neo-border bg-[var(--neo-coral)] px-3 py-1.5 text-black neo-shadow inline-block">
                    {portfolio.person.name.split(" ")[2]}.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm font-mono font-bold uppercase tracking-wider text-black/70">
                  {portfolio.person.role}
                </p>

                <p className="mt-4 max-w-2xl text-base leading-7 text-black/80">
                  {portfolio.person.headline} {portfolio.person.bio}
                </p>

                <div className="mt-7 flex flex-wrap justify-center md:justify-start items-center gap-3">
                  <NeoButton href={portfolio.links.cv}>DOWNLOAD CV +</NeoButton>
                  <NeoButton href="#contact" variant="outline">
                    CONTACT ME →
                  </NeoButton>
                </div>
              </div>
              <NeoCard accent="paper" className="p-0 hidden md:block">
                <div className="">
                  <div className="">
                    <img src="/images/profile.jpeg" alt="profile.jpeg" className="neo-border mx-auto flex w-32 md:w-48 lg:w-64 items-center justify-center" />
                  </div>
                </div>
              </NeoCard>
            </div>
          </Container>

          <div className="neo-marquee">
            <div className="neo-marquee-track py-3">
              {marquee.map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="inline-flex items-center gap-4 px-4 text-xs font-mono font-black uppercase tracking-[0.25em]"
                >
                  <span>{t}</span>
                  <span className="text-black/40">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-3 border-black/90 py-14">
          <Container>
            <SectionHeader kicker="01 — About" title="About Me" id="about" />

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-1">
              <div className="grid grid-cols-3 gap-5 te">
                <NeoCard accent="sky">
                  <p className="text-xs font-mono font-black uppercase tracking-widest opacity-75">
                    Location
                  </p>
                  <p className="mt-2 text-sm lg:text-lg font-black">{portfolio.person.location}</p>
                </NeoCard>

                <NeoCard accent="paper">
                  <p className="text-xs font-mono font-black uppercase tracking-widest opacity-75">
                    Education
                  </p>
                  <p className="mt-2 text-sm lg:text-lg font-black">{portfolio.about.education}</p>
                </NeoCard>

                <NeoCard accent="peach">
                  <p className="text-[11px] font-mono font-black uppercase tracking-widest opacity-75">
                    GPA
                  </p>
                  <p className="mt-2 text-sm lg:text-lg font-black">{portfolio.about.gpa}</p>
                </NeoCard>
              </div>

              <ExperienceTimeline items={portfolio.experience} />
            </div>
          </Container>
        </section>

        <section className="border-b-3 border-black/90 py-14">
          <Container>
            <SectionHeader kicker="02 — Skills" title="Tech Stack" id="skills" />

            <div className="mt-8 flex flex-wrap gap-2">
              {portfolio.skills.stack.map((s) => (
                <Badge
                  key={s}
                  className={cx(
                    getSkillBadgeClass(s),
                    "hover:scale-105 transition-transform"
                  )}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-3 border-black/90 py-14">
          <Container>
            <SectionHeader kicker="03 — Work" title="Portfolio" id="portfolio" />
            <ProjectsSection projects={portfolio.projects} />
          </Container>
        </section>

        <section className="border-b-3 border-black/90 py-14">
          <Container>
            <SectionHeader
              kicker="04 — Community"
              title="Organizations & Activities"
              id="org"
            />

            <div className="mt-8 grid gap-6">
              {portfolio.organizations.map((org) => (
                <div key={org.name} className="grid gap-3">
                  <NeoCard accent={org.accent}>
                    <p className="text-sm font-black">{org.name}</p>
                    <p className="mt-1 text-xs font-mono font-bold uppercase tracking-wider opacity-75">
                      {org.location} • {org.period}
                    </p>
                  </NeoCard>

                  <div className="grid gap-3">
                    {org.items.map((item, idx) => {
                      const badgeAccents = ["bg-[var(--neo-mint)]", "bg-[var(--neo-mint)]", "bg-[var(--neo-sky)]", "bg-[var(--neo-peach)]"];
                      return (
                        <NeoCard
                          key={`${item.title}-${item.year}`}
                          accent="paper"
                          className="flex items-start justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-mono font-black uppercase tracking-widest text-black/50">
                              {String(idx + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-2 text-sm font-black">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-black/70">
                              {item.summary}
                            </p>
                          </div>
                          <Badge className={cx("shrink-0", badgeAccents[idx] || "bg-[var(--neo-paper)]")}>
                            {item.year}
                          </Badge>
                        </NeoCard>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-3 border-black/90 py-14">
          <Container>
            <SectionHeader
              kicker="05 — Credentials"
              title="Certificates & Awards"
              id="certificates"
            />

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {portfolio.certificates.map((c) => (
                <NeoCard key={`${c.title}-${c.year}`} accent={c.accent}>
                  <p className="text-xs font-mono font-black uppercase tracking-widest opacity-70">
                    {c.year}
                  </p>
                  <p className="mt-2 text-base font-black leading-snug">{c.title}</p>
                  <p className="mt-2 text-sm text-black/70">
                    {c.issuer}
                  </p>
                </NeoCard>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="contact"
          className="bg-[var(--neo-night)] py-16 text-[var(--neo-snow)]"
        >
          <Container>
            <p className="text-xs font-mono font-black uppercase tracking-widest text-[var(--neo-sun)]">
              06 — Let’s talk
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
              Got a project? <span className="text-[var(--neo-sun)]">Let’s build</span> something together.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
              {portfolio.cta.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <NeoButton
                href={portfolio.links.email}
                className="bg-[var(--neo-sun)] text-black hover:bg-[var(--neo-sun)]/90"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email</span>
              </NeoButton>
              <NeoButton
                href={portfolio.links.linkedin}
                variant="outline"
                className="bg-[var(--neo-sky)] text-[var(--neo-snow)] hover:bg-[var(--neo-sky)]/90"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </NeoButton>
              <NeoButton
                href={portfolio.links.github}
                variant="outline"
                className="bg-[var(--neo-snow)] text-[var(--neo-snow)] hover:bg-[var(--neo-snow)]/90"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
                <span>GitHub</span>
              </NeoButton>
              <NeoButton
                href={portfolio.links.instagram}
                variant="outline"
                className="bg-[var(--neo-peach)] text-[var(--neo-snow)] hover:bg-[var(--neo-peach)]/90"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
                </svg>
                <span>Instagram</span>
              </NeoButton>
            </div>

            <div className="mt-12 border-t-2 border-white/15 pt-6 text-xs font-mono font-bold uppercase tracking-widest text-white/60">
              © {new Date().getFullYear()} {portfolio.person.name}
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
