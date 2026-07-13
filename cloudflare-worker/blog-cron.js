/**
 * BellyOff Blog Cron Worker
 * Triggers daily at 07:00 UTC via Cloudflare Cron, but publishes only once
 * every 3 days (guard in scheduled(), based on days since the Unix epoch).
 * Generates blog posts in 6 languages using Claude Haiku and commits them to GitHub.
 *
 * Required secrets (set via wrangler secret put):
 *   ANTHROPIC_API_KEY
 *   GITHUB_TOKEN         (fine-grained, Contents: write on the bellyoff-website repo)
 *   GITHUB_OWNER         (e.g. "yourusername")
 *   GITHUB_REPO          (e.g. "bellyoff-website")
 *
 * wrangler.toml crons:  [triggers] crons = ["0 7 * * *"]
 */

// Publish cadence: one post-set every N days. Change this to adjust frequency.
const PUBLISH_EVERY_DAYS = 3;

const LANGS = ['en', 'he', 'ar', 'es', 'de', 'fr'];

const TOPICS = [
  { en: 'How anterior pelvic tilt causes belly protrusion', category: 'posture' },
  { en: 'The cortisol-belly fat connection after 40', category: 'metabolism' },
  { en: 'Why diaphragmatic breathing activates the deep core', category: 'breathing' },
  { en: 'Somatic movement vs high-intensity exercise for belly reduction', category: 'movement' },
  { en: '5 signs your pelvic tilt is causing your belly to protrude', category: 'posture' },
  { en: 'How to activate your transverse abdominis without crunches', category: 'breathing' },
  { en: 'The lymphatic system and belly fat after 40', category: 'metabolism' },
  { en: 'Why morning exercise matters for cortisol management', category: 'metabolism' },
  { en: 'Posture correction exercises that are safe for back pain', category: 'posture' },
  { en: 'How stress accumulates in the abdomen after 40', category: 'mindset' },
  { en: 'The role of the vagus nerve in belly fat reduction', category: 'breathing' },
  { en: 'Why 10 minutes is more effective than 60 minutes for the 40+ body', category: 'movement' },
  { en: 'Hip flexor release for belly reduction', category: 'posture' },
  { en: 'Breathing patterns that lower cortisol throughout the day', category: 'breathing' },
  { en: 'The connection between poor sleep and belly fat after 40', category: 'mindset' },
  { en: 'Somatic walking: the forgotten tool for belly reduction', category: 'movement' },
  { en: 'How to maintain results from belly reduction practices', category: 'movement' },
  { en: 'The science of visceral fat and hormonal decline after 40', category: 'metabolism' },
  { en: 'Parasympathetic breathing for daily stress and belly fat', category: 'breathing' },
  { en: 'Why posture is the missing piece in most belly reduction programs', category: 'posture' },
  { en: 'Building a daily movement practice that sticks', category: 'mindset' },
  { en: 'The transverse abdominis: the belly-flattening muscle most programs ignore', category: 'breathing' },
  { en: 'How deep breathing changes your posture without effort', category: 'breathing' },
  { en: 'Age and metabolism: what actually slows down after 40', category: 'metabolism' },
  { en: 'Floor-based posture exercises safe for the 40+ body', category: 'posture' },
  { en: 'The mind-body connection in abdominal fat storage', category: 'mindset' },
  { en: 'How to reduce belly protrusion while sitting at a desk', category: 'posture' },
  { en: 'Evening breathing routines for cortisol recovery', category: 'breathing' },
  { en: '30-day belly reduction: what to expect each week', category: 'movement' },
  { en: 'The difference between subcutaneous and visceral belly fat', category: 'metabolism' },
];

const LANG_INSTRUCTIONS = {
  en: 'Write in English.',
  he: 'Write in Hebrew (עברית). Use right-to-left friendly phrasing.',
  ar: 'Write in Arabic (العربية). Use right-to-left friendly phrasing.',
  es: 'Write in Spanish (Español).',
  de: 'Write in German (Deutsch).',
  fr: 'Write in French (Français).',
};

// Whole days since the Unix epoch (UTC). Stable across month/year boundaries,
// which keeps the every-3-days cadence perfectly regular.
function getEpochDay(date) {
  return Math.floor(date.getTime() / 86400000);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 60);
}

async function generatePost(topic, lang, date, env) {
  const dateStr = date.toISOString().split('T')[0];
  const langInstruction = LANG_INSTRUCTIONS[lang];

  const prompt = `You are writing a blog post for BellyOff (bellyoff.app), a 10-minute daily workout app for belly reduction in adults 40 and older.

Topic: "${topic.en}"
${langInstruction}

Write a blog post following these rules:
1. Title: question-form or "How to..." for featured snippet eligibility
2. First 100 words: direct answer to the title question (for AI engine extraction)
3. Structure with markdown headings: use ## for major sections (H2) and ### for subsections (H3). Put a blank line before and after every heading.
4. Write in short, readable paragraphs (2-4 sentences each), separated by blank lines. Use bullet lists (- item) where it helps scanning.
5. Include a FAQ section at the end (## FAQ) with 3-4 Q&A pairs, each question as ### .
6. Word count: 900-1200 words
7. Category: ${topic.category}
8. Mention BellyOff naturally 2-3 times (not spammy)
9. Internal references: mention the 3-phase method (Phase A breathing, Phase B posture, Phase C movement)
10. No keyword stuffing. Natural, helpful language for readers aged 40+.
11. End with a brief CTA to try BellyOff (free download)
12. NEVER use an em-dash or en-dash (— or –). Use a regular hyphen "-", a comma, or a colon instead.
13. Write in gender-neutral language. Address the reader without assuming gender. In grammatically gendered languages (Hebrew, Arabic, Spanish, French), avoid masculine-only forms: prefer neutral phrasing, infinitives, plural address, or rephrasing. The text must read naturally for both women and men.

Return your response using EXACTLY this delimiter format (no JSON, no code blocks):
<<<TITLE>>>
(your title here)
<<<EXCERPT>>>
(1-2 sentence excerpt)
<<<SLUG>>>
(kebab-case slug, max 60 chars, romanized if needed)
<<<CONTENT>>>
(full markdown body, NO frontmatter)
<<<END>>>`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text;

  const extract = (tag) => {
    const m = text.match(new RegExp(`<<<${tag}>>>\\s*([\\s\\S]*?)(?=<<<|$)`));
    if (!m) throw new Error(`Missing <<<${tag}>>> in response for lang=${lang}`);
    return m[1].trim();
  };

  // Never allow em-dash / en-dash in any output. Replace with a regular hyphen.
  const noDash = (s) => s.replace(/\s*[—–]\s*/g, ' - ').replace(/[—–]/g, '-');

  const post = {
    title: noDash(extract('TITLE')),
    excerpt: noDash(extract('EXCERPT')),
    slug: extract('SLUG'),
    content: noDash(extract('CONTENT')),
  };

  const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${dateStr}"
lang: "${lang}"
category: "${topic.category}"
excerpt: "${post.excerpt.replace(/"/g, '\\"')}"
slug: "${post.slug}"
---

${post.content}`;

  return { frontmatter, slug: post.slug };
}

async function commitToGitHub(content, lang, slug, date, env) {
  const dateStr = date.toISOString().split('T')[0];
  const path = `content/blog/${lang}/${dateStr}-${slug}.md`;
  const owner = env.GITHUB_OWNER;
  const repo = env.GITHUB_REPO;
  const token = env.GITHUB_TOKEN;

  const encoded = btoa(unescape(encodeURIComponent(content)));

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'BellyOff-Blog-Cron/1.0',
      },
      body: JSON.stringify({
        message: `blog: daily post ${lang} ${dateStr}`,
        content: encoded,
      }),
    }
  );

  if (response.status === 422) {
    // File already exists for today - skip silently
    return path + ' (already exists, skipped)';
  }

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`GitHub commit failed for ${lang}: ${response.status} ${err}`);
  }

  return path;
}

const LANG_FULL = { en: 'English', he: 'Hebrew', ar: 'Arabic', es: 'Spanish', de: 'German', fr: 'French' };
const noDashFix = (s) => s.replace(/\s*[—–]\s*/g, ' - ').replace(/[—–]/g, '-');

async function ghHeaders(env) {
  return { Authorization: `token ${env.GITHUB_TOKEN}`, 'User-Agent': 'BellyOff-Blog-Cron/1.0' };
}

async function ghListMd(dirPath, env) {
  const r = await fetch(`https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${dirPath}`, { headers: await ghHeaders(env) });
  if (!r.ok) throw new Error(`list ${dirPath}: ${r.status}`);
  const arr = await r.json();
  return arr.filter((f) => f.type === 'file' && f.name.endsWith('.md')).map((f) => f.path);
}

async function ghGetFile(path, env) {
  const r = await fetch(`https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`, { headers: await ghHeaders(env) });
  if (!r.ok) throw new Error(`get ${path}: ${r.status}`);
  const j = await r.json();
  const content = decodeURIComponent(escape(atob(j.content.replace(/\n/g, ''))));
  return { content, sha: j.sha };
}

async function ghPutFile(path, content, sha, message, env) {
  const encoded = btoa(unescape(encodeURIComponent(content)));
  const r = await fetch(`https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...(await ghHeaders(env)), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: encoded, sha }),
  });
  if (!r.ok) throw new Error(`put ${path}: ${r.status} ${await r.text()}`);
}

// Rewrite one post to gender-neutral language, preserving frontmatter slug/date/lang/category.
async function buildNeutralFile(lang, path, env) {
  const { content, sha } = await ghGetFile(path, env);
  const m = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`bad frontmatter ${path}`);
  const fm = m[1];
  const body = m[2].replace(/^\s+/, '');
  const field = (k) => { const mm = fm.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm')); return mm ? mm[1] : ''; };
  const title = field('title'), excerpt = field('excerpt'), date = field('date'), category = field('category'), slug = field('slug');

  const prompt = `Rewrite this ${LANG_FULL[lang]} blog content to use gender-neutral address, so it reads naturally for both women and men. Keep the meaning, structure, markdown headings (## and ###), lists, and length the same. Only change gendered wording (verbs, pronouns, adjectives that address the reader). Never use an em-dash or en-dash; use a regular hyphen "-" instead.

Return EXACTLY this format, nothing else:
<<<TITLE>>>
(neutral title)
<<<EXCERPT>>>
(neutral excerpt)
<<<CONTENT>>>
(full neutral markdown body, NO frontmatter)
<<<END>>>

TITLE: ${title}
EXCERPT: ${excerpt}
CONTENT:
${body}`;

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 5000, messages: [{ role: 'user', content: prompt }] }),
  });
  const data = await resp.json();
  const text = data.content[0].text;
  const ex = (tag) => { const mm = text.match(new RegExp(`<<<${tag}>>>\\s*([\\s\\S]*?)(?=<<<|$)`)); if (!mm) throw new Error(`missing ${tag} in ${path}`); return mm[1].trim(); };
  const nTitle = noDashFix(ex('TITLE')), nExcerpt = noDashFix(ex('EXCERPT')), nContent = noDashFix(ex('CONTENT'));

  const newFile = `---
title: "${nTitle.replace(/"/g, '\\"')}"
date: "${date}"
lang: "${lang}"
category: "${category}"
excerpt: "${nExcerpt.replace(/"/g, '\\"')}"
slug: "${slug}"
---

${nContent}`;

  return { path, sha, newFile };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/test-cron') {
      const results = await this.scheduled({}, env, ctx);
      return new Response(JSON.stringify(results, null, 2), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // One-time maintenance: rewrite existing posts in a language to gender-neutral.
    // Call once per language: /neutralize?lang=he
    if (url.pathname === '/neutralize') {
      const lang = url.searchParams.get('lang');
      if (!lang || !LANG_FULL[lang]) {
        return new Response('pass ?lang=he|ar|es|fr|de|en', { status: 400 });
      }
      let files = [];
      try { files = await ghListMd(`content/blog/${lang}`, env); }
      catch (e) { return new Response(JSON.stringify({ lang, error: e.message }), { status: 500 }); }

      const built = await Promise.all(files.map(async (p) => {
        try { return await buildNeutralFile(lang, p, env); }
        catch (e) { return { path: p, error: e.message }; }
      }));

      const results = [];
      for (const b of built) {
        if (b.error) { results.push({ path: b.path, status: 'error', error: b.error }); continue; }
        try { await ghPutFile(b.path, b.newFile, b.sha, `blog: gender-neutral rewrite ${lang}`, env); results.push({ path: b.path, status: 'ok' }); }
        catch (e) { results.push({ path: b.path, status: 'error', error: e.message }); }
      }
      return new Response(JSON.stringify(results, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Not found', { status: 404 });
  },

  async scheduled(event, env, ctx) {
    const date = new Date();
    const epochDay = getEpochDay(date);

    // Publish only once every PUBLISH_EVERY_DAYS days. On off-days, do nothing.
    if (epochDay % PUBLISH_EVERY_DAYS !== 0) {
      console.log(`[blog-cron] skipped: not a publish day (every ${PUBLISH_EVERY_DAYS} days). epochDay=${epochDay}`);
      return [{ status: 'skipped', reason: 'not-a-publish-day', epochDay }];
    }

    // Advance one topic per publish so all TOPICS are used in rotation.
    const topic = TOPICS[Math.floor(epochDay / PUBLISH_EVERY_DAYS) % TOPICS.length];

    // Generate all posts in parallel (fast), then commit sequentially (avoids GitHub 409 race)
    const generated = await Promise.all(
      LANGS.map(async (lang) => {
        try {
          const { frontmatter, slug } = await generatePost(topic, lang, date, env);
          return { lang, status: 'generated', frontmatter, slug };
        } catch (err) {
          console.error(`[blog-cron] generate error for ${lang}:`, err.message);
          return { lang, status: 'error', error: err.message };
        }
      })
    );

    const results = [];
    for (const item of generated) {
      if (item.status === 'error') {
        results.push({ lang: item.lang, status: 'error', error: item.error });
        continue;
      }
      try {
        const path = await commitToGitHub(item.frontmatter, item.lang, item.slug, date, env);
        console.log(`[blog-cron] committed ${path}`);
        results.push({ lang: item.lang, status: 'ok', path });
      } catch (err) {
        console.error(`[blog-cron] commit error for ${item.lang}:`, err.message);
        results.push({ lang: item.lang, status: 'error', error: err.message });
      }
    }

    console.log('[blog-cron] done:', JSON.stringify(results));
    return results;
  },
};
