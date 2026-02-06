import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import mePhoto from "./assets/me.jpg";

const cn = (...c) => c.filter(Boolean).join(" ");

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.2, 0.9, 0.2, 1] },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

function Container({ children, className }) {
  return <div className={cn("container", className)}>{children}</div>;
}

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

function Button({ children, href = "#", variant = "ghost" }) {
  const cls = cn("btn", variant === "primary" && "btnPrimary");
  return (
    <a
      className={cls}
      href={href}
      onClick={(e) => href === "#" && e.preventDefault()}
    >
      {children}
    </a>
  );
}

function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      className="section"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.18 }}
    >
      <Container>
        <div className="sectionHead">
          <h2 className="h2">{title}</h2>
        </div>
        {children}
      </Container>
    </motion.section>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const yTitle = useTransform(scrollY, [0, 300], [0, -20]);
  const yGlow = useTransform(scrollY, [0, 400], [0, 40]);
  const opacityGlow = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section id="top" className="hero">
      <Container className="heroGrid">
        {/* LEFT */}
        <div className="heroLeft">
          <motion.p
            className="eyebrow"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Software Engineer
          </motion.p>

          <motion.div
            className="heroAvatar"
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img src={mePhoto} alt="John Paul Besagas" />
          </motion.div>

          <motion.h1
            className="heroTitle"
            style={{ y: yTitle }}
            initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
          >
            JOHN PAUL <br />
            BESAGAS
          </motion.h1>

          <motion.p
            className="heroSub"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
          >
            <div className="heroAbout">
              <h2 className="heroAboutTitle">About Me</h2>
            </div>

            BS Computer Science (Software Engineering) student at FEU
            Institute of Technology. I enjoy building reliable systems and
            integrating ML features into real applications.
            Building systems and integrate ML features into real applications.
            I care about reliability, testing, and smooth UX.
          </motion.p>

          <motion.div className="ctaRow" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Button variant="primary" href="#projects">View Projects</Button>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button href="#contact">Contact</Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="metaRow"
            variants={stagger}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
          >
            {["Python", "JavaScript", "MySQL", "React", "C++"].map((t) => (
              <motion.span key={t} variants={fadeUp} className="chip">
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* ABOUT ME (now inside hero left) */}

        </div>

        {/* RIGHT */}
        <motion.aside
          className="heroCard"
          style={{ y: yGlow, opacity: opacityGlow }}
          initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
        >
          <div className="card">
            <h3 className="cardTitle">Quick Links</h3>

            <div className="kv">
              <span className="muted">GitHub</span>
              <a className="link" href="https://github.com/jape03" target="_blank" rel="noreferrer">
                jape03
              </a>
            </div>

            <div className="kv">
              <span className="muted">LinkedIn</span>
              <a
                className="link"
                href="https://www.linkedin.com/in/john-paul-besagas"
                target="_blank"
                rel="noreferrer"
              >
                john-paul-besagas
              </a>
            </div>

            <div className="kv">
              <span className="muted">Email</span>
              <a className="link" href="mailto:johnpaul.besagas03@gmail.com">
                johnpaul.besagas03@gmail.com
              </a>
            </div>
          </div>
        </motion.aside>
      </Container>
    </section>
  );
}


function Projects() {
  const items = [
    {
      title: "G-Steno",
      role: "Backend Developer",
      description:
        "An interactive Gregg shorthand learning app with ML-powered stroke recognition.",
      image: "/gsteno.png",
      tags: ["Python", "TensorFlow", "API"],
      github: "https://github.com/jape03/clone-model-gsteno",
    },
    {
      title: "iTam Reserve",
      role: "Backend Developer",
      description:
        "A university equipment reservation system with conflict detection and role-based access.",
      image: "/itam.png",
      tags: ["PHP", "MySQL", "Web"],
      github:
        "https://github.com/jape03/PHP-Projects/tree/main/iTamReserve-final",
    },
  ];

  return (
    <div className="grid2">
      {items.map((p) => (
        <motion.article
          key={p.title}
          className="projectCard"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="projectImage">
            <img src={p.image} alt={`${p.title} thumbnail`} />
          </div>

          <div className="projectContent">
            <div className="projectHeader">
              <div>
                <h3 className="h3">{p.title}</h3>
                <p className="muted small" style={{ marginTop: 4 }}>
                  {p.role}
                </p>
              </div>
            </div>

            <p className="muted">{p.description}</p>

            <div className="tagRow">
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="btnRow">
              <Button href={p.github}>GitHub</Button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <div className="app">
        <Hero />
        <Section id="skills" title="Skills">
          <div className="grid3">
            {[
              { title: "Programming", items: ["Python", "Java", "C++"] },
              {
                title: "Web & Data",
                items: ["PHP", "MySQL", "REST APIs", "HTML/CSS"],
              },
              { title: "Tools", items: ["Git/GitHub", "TensorFlow", "Testing mindset"] },
            ].map((g) => (
              <motion.div key={g.title} className="card" whileHover={{ y: -4 }}>
                <h3 className="cardTitle">{g.title}</h3>
                <div className="tagRow">
                  {g.items.map((x) => (
                    <Tag key={x}>{x}</Tag>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <Projects />
        </Section>

        <Section id="contact" title="Contact">
          <div className="card contact">
            <div className="grid3">
              <div className="kv">
                <span className="muted">Email</span>
                <a className="link" href="mailto:johnpaul.besagas03@gmail.com">
                  johnpaul.besagas03@gmail.com
                </a>
              </div>
              <div className="kv">
                <span className="muted">GitHub</span>
                <a
                  className="link"
                  href="https://github.com/jape03"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/jape03
                </a>
              </div>
              <div className="kv">
                <span className="muted">LinkedIn</span>
                <a
                  className="link"
                  href="https://www.linkedin.com/in/john-paul-besagas"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/john-paul-besagas
                </a>
              </div>
            </div>

            <p className="muted small" style={{ marginTop: 16 }}>
              © {new Date().getFullYear()} John Paul L. Besagas
            </p>
          </div>
        </Section>
      </div>
    </AnimatePresence>
  );
}
