import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ── animated counter ── */
const Counter = ({ to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    if (inView) raw.set(to);
  }, [inView, to, raw]);
  return <motion.span ref={ref}>{display}</motion.span>;
};

/* ── scroll reveal ── */
const Reveal = ({ children, delay = 0, x = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ── typewriter ── */
const Typewriter = ({ words }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIdx((i) => i + 1);
      } else {
        setText((t) =>
          deleting ? t.slice(0, -1) : word.slice(0, t.length + 1),
        );
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words]);
  return (
    <span className="text-purple-500 font-extrabold">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        |
      </motion.span>
    </span>
  );
};

/* ── floating particle ── */
const Particle = ({ size, x, y, duration, delay }) => (
  <motion.div
    className="absolute rounded-full bg-purple-300 opacity-30 pointer-events-none"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const TEAM = [
  {
    name: "Ravi Ranjan",
    role: "Founder & Lead Developer",
    avatar: "R",
    color: "from-purple-500 to-purple-700",
    bio: "Full-stack developer passionate about building clean, fast web experiences. Created RRR Blog to share knowledge across the dev community.",
    skills: ["React", "Node.js", "MongoDB", "Tailwind"],
  },
];

const CATEGORIES = [
  {
    name: "General",
    desc: "Thoughts, opinions and general topics.",
    color: "from-purple-400 to-purple-600",
    path: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    ),
  },
  {
    name: "Web Design",
    desc: "UI/UX, CSS, design systems and more.",
    color: "from-pink-400 to-pink-600",
    path: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    ),
  },
  {
    name: "Development",
    desc: "Code, frameworks, tools and tutorials.",
    color: "from-blue-400 to-blue-600",
    path: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    ),
  },
  {
    name: "Database",
    desc: "SQL, NoSQL, data modeling and optimization.",
    color: "from-green-400 to-green-600",
    path: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
        />
      </>
    ),
  },
  {
    name: "Search Engines",
    desc: "SEO, indexing, and search strategies.",
    color: "from-yellow-400 to-orange-500",
    path: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
  },
  {
    name: "Marketing",
    desc: "Growth, content strategy and branding.",
    color: "from-red-400 to-red-600",
    path: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
];

const STATS = [
  {
    key: "totalPosts",
    label: "Posts Published",
    bg: "from-purple-500 to-purple-700",
    path: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
  },
  {
    key: "totalUsers",
    label: "Registered Writers",
    bg: "from-blue-500 to-blue-700",
    path: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
  {
    key: "totalReads",
    label: "Total Reads",
    bg: "from-green-500 to-green-700",
    path: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    ),
  },
  {
    key: "totalCategories",
    label: "Categories",
    bg: "from-orange-400 to-orange-600",
    path: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    ),
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "RRR Blog Founded",
    desc: "Started as a personal project to share dev knowledge.",
  },
  {
    year: "2024",
    title: "First 10 Posts",
    desc: "Community started growing with quality technical content.",
  },
  {
    year: "2025",
    title: "Multi-Author Platform",
    desc: "Opened up for all writers to publish their stories.",
  },
  {
    year: "2025",
    title: "100+ Reads",
    desc: "Crossed a major milestone in total content reads.",
  },
];

const About = () => {
  const { data: stats, isPending } = useQuery({
    queryKey: ["blogStats"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/stats`,
      );
      return res.data;
    },
  });

  const particles = [
    { size: 12, x: 10, y: 15, duration: 6, delay: 0 },
    { size: 8, x: 85, y: 10, duration: 8, delay: 1 },
    { size: 16, x: 70, y: 60, duration: 7, delay: 2 },
    { size: 10, x: 20, y: 75, duration: 9, delay: 0.5 },
    { size: 6, x: 50, y: 30, duration: 5, delay: 1.5 },
    { size: 14, x: 90, y: 80, duration: 10, delay: 3 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-20 overflow-hidden">
      {/* ── HERO ── */}
      <div className="relative text-center flex flex-col items-center gap-6 py-8">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        <motion.div
          className="absolute -top-16 -left-32 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 pointer-events-none"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -right-32 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30 pointer-events-none"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 14,
            delay: 0.1,
          }}
          whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-400 to-purple-700 flex items-center justify-center shadow-2xl shadow-purple-300 text-5xl z-10 cursor-default"
        >
          ✍️
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            RRR | | BLOG
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            A home for{" "}
            <Typewriter
              words={[
                "developers",
                "designers",
                "writers",
                "creators",
                "curious minds",
              ]}
            />
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-gray-600 max-w-xl leading-relaxed text-sm z-10"
        >
          RRR Blog is a community-driven platform where writers share knowledge,
          tutorials, opinions and stories across technology, design, and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex gap-3 z-10"
        >
          <Link to="/posts">
            <motion.span
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block px-6 py-2.5 bg-purple-500 text-white rounded-xl font-semibold shadow-md shadow-purple-200 text-sm"
            >
              Browse Posts
            </motion.span>
          </Link>
          <Link to="/write">
            <motion.span
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block px-6 py-2.5 bg-white text-purple-600 border border-purple-200 rounded-xl font-semibold text-sm"
            >
              Start Writing
            </motion.span>
          </Link>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-1 mt-4 z-10"
        >
          <span className="text-xs text-gray-400">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── STATS ── */}
      <Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.key}
              variants={item}
              whileHover={{
                y: -8,
                boxShadow: "0 24px 48px rgba(139,92,246,0.18)",
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center gap-3 text-center cursor-default overflow-hidden relative group"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.bg} flex items-center justify-center shadow-md z-10`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {s.path}
                </svg>
              </motion.div>
              <span className="text-2xl font-extrabold text-gray-800 z-10">
                {isPending ? (
                  <span className="inline-block w-12 h-7 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <Counter to={stats?.[s.key] ?? 0} />
                )}
              </span>
              <span className="text-xs text-gray-400 font-medium z-10">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Reveal>

      {/* ── MISSION ── */}
      <Reveal delay={0.1}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-purple-100 p-8 flex flex-col gap-4 overflow-hidden"
        >
          <motion.div
            className="absolute -right-10 -top-10 w-40 h-40 bg-purple-100 rounded-full blur-2xl opacity-50 pointer-events-none"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <h2 className="text-2xl font-extrabold text-gray-800 z-10">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm z-10">
            We believe knowledge should be free and accessible. RRR Blog was
            built to give developers and creators a clean, distraction-free
            place to write and read. No paywalls, no noise — just good content.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm z-10">
            Every post is written by real people sharing real experience. We
            encourage thoughtful writing, constructive discussion, and a
            welcoming community for everyone at any skill level.
          </p>
        </motion.div>
      </Reveal>

      {/* ── TIMELINE ── */}
      <div>
        <Reveal>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-8">
            Our Journey
          </h2>
        </Reveal>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-transparent" />
          <div className="flex flex-col gap-6">
            {TIMELINE.map((t, i) => (
              <Reveal key={i} delay={i * 0.12} x={-30}>
                <div className="flex gap-6 items-start pl-2">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md z-10"
                  >
                    {t.year.slice(2)}
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex-1 hover:border-purple-200 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">
                        {t.year}
                      </span>
                      <h3 className="font-bold text-gray-800 text-sm">
                        {t.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {t.desc}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <div>
        <Reveal>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
            What We Cover
          </h2>
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.name}
              variants={item}
              whileHover={{
                y: -6,
                scale: 1.03,
                boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-purple-200 transition-colors cursor-default group"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 shadow-sm`}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {cat.path}
                </svg>
              </motion.div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-purple-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── TEAM ── */}
      <div>
        <Reveal>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
            Behind the Blog
          </h2>
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={item}
              whileHover={{
                x: 8,
                boxShadow: "0 16px 40px rgba(139,92,246,0.12)",
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-5 hover:border-purple-200 transition-colors"
            >
              <motion.div
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0 shadow-lg`}
              >
                {member.avatar}
              </motion.div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">
                  {member.name}
                </h3>
                <p className="text-xs text-purple-500 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-xs bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full font-medium border border-purple-100"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── CTA ── */}
      <Reveal delay={0.1}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative bg-gradient-to-r from-purple-500 to-purple-700 rounded-3xl p-12 text-center text-white flex flex-col items-center gap-5 shadow-2xl shadow-purple-300 overflow-hidden"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-white/10 pointer-events-none"
              style={{ width: i * 120, height: i * 120 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-5xl z-10"
          >
            🚀
          </motion.div>
          <h2 className="text-3xl font-extrabold z-10">
            Ready to share your story?
          </h2>
          <p className="text-purple-100 text-sm max-w-md z-10">
            Join the community. Write about what you know, learn from others,
            and grow together.
          </p>
          <Link to="/write" className="z-10">
            <motion.span
              whileHover={{
                scale: 1.08,
                boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-3.5 bg-white text-purple-600 rounded-xl font-bold shadow-lg text-sm"
            >
              Start Writing Today
            </motion.span>
          </Link>
        </motion.div>
      </Reveal>
    </div>
  );
};

export default About;
