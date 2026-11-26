import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { gallery, story } from "../config/wedding";
import LineReveal from "../components/ui/LineReveal";
import Photo from "../components/ui/Photo";

const n = story.length;

function Chapter({ c, i, progress }) {
  const s = i / n;
  const e = (i + 1) / n;
  const first = i === 0;
  const last = i === n - 1;
  const enter = useTransform(progress, first ? [0, 0.0001] : [s, s + 0.06], [
    first ? 1 : 0,
    1,
  ]);
  const leave = useTransform(progress, last ? [0, 1] : [e - 0.08, e - 0.02], [
    1,
    last ? 1 : 0,
  ]);
  const visible = useTransform([enter, leave], ([a, b]) => a * b);
  const clip = useTransform(enter, (v) => `inset(${(1 - v) * 100}% 0% 0% 0%)`);
  const textY = useTransform(enter, [0, 1], [48, 0]);
  const driftY = useTransform(leave, [1, 0], [0, -70]);
  const yearY = useTransform(progress, [s, e], [24, -24]);
  const flip = i % 2 === 1;
  const src = gallery[i % gallery.length];
  return (
    <motion.article
      style={{ opacity: visible, y: driftY }}
      className="absolute inset-0 grid grid-rows-[52%_1fr] gap-6 px-5 pb-10 pt-28 md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-10 md:px-12 md:pt-10"
    >
      <motion.span
        aria-hidden="true"
        style={{ y: yearY }}
        className={`pointer-events-none absolute top-3 font-display text-[22vw] leading-none text-blush md:top-[14%] md:text-[24vw] ${flip ? "right-5 md:left-10 md:right-auto" : "left-5 md:left-auto md:right-10"}`}
      >
        {c.year}
      </motion.span>

      <motion.div
        style={{ clipPath: clip }}
        className={`relative z-10 min-h-0 md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : "md:col-start-1"}`}
      >
        <Photo
          src={src.src}
          alt={src.alt}
          seed={i + 1}
          ratio={null}
          className="h-full w-full md:aspect-[4/5] md:h-auto"
        />
      </motion.div>

      <motion.div
        style={{ opacity: enter, y: textY }}
        className={`relative z-10 md:col-span-5 ${flip ? "md:col-start-2 md:order-1" : "md:col-start-8"}`}
      >
        <h3 className="font-display text-[length:var(--text-title)] text-wine">
          {c.title}
        </h3>
        <p className="mt-4">{c.body}</p>
      </motion.div>
    </motion.article>
  );
}

function Rail({ progress }) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(progress, "change", (v) =>
    setIdx(Math.min(n - 1, Math.floor(v * n))),
  );
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-6 left-5 z-20 flex items-center gap-2 md:left-12"
    >
      {story.map((c, i) => (
        <span
          key={c.id}
          className={`h-[3px] transition-all duration-500 ${i === idx ? "w-10 bg-rose" : "w-4 bg-wine/30"}`}
        />
      ))}
      <span className="ml-2 font-text text-sm italic text-wine">
        {story[idx].year}
      </span>
    </div>
  );
}

function StoryList() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-5 pb-20 md:px-12">
      {story.map((c, i) => (
        <article key={c.id} className="grid gap-6 md:grid-cols-2">
          <Photo
            src={gallery[i % gallery.length].src}
            alt={gallery[i % gallery.length].alt}
            seed={i + 1}
            ratio={4 / 5}
          />
          <div>
            <p className="font-display text-6xl text-blush">{c.year}</p>
            <h3 className="mt-2 font-display text-3xl text-wine">{c.title}</h3>
            <p className="mt-3">{c.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Story() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <section id="cerita" aria-labelledby="cerita-judul">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-20 md:px-12 md:pt-32">
        <LineReveal className="font-display text-[length:var(--text-title)] text-wine">
          <span id="cerita-judul">Cerita kami</span>
        </LineReveal>
      </div>
      {reduce ? (
        <StoryList />
      ) : (
        <div
          ref={ref}
          style={{ height: `${n * 100 + 40}vh` }}
          className="relative"
        >
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            {story.map((c, i) => (
              <Chapter key={c.id} c={c} i={i} progress={scrollYProgress} />
            ))}
            <Rail progress={scrollYProgress} />
          </div>
        </div>
      )}
    </section>
  );
}
