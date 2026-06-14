/**
 * BellyOff Blog Cron Worker
 * Triggers daily at 07:00 UTC via Cloudflare Cron.
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

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
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
3. H2 sections for major topics, H3 for subsections
4. Include a FAQ section at the end with 3-4 Q&A pairs
5. Word count: 900-1200 words
6. Category: ${topic.category}
7. Mention BellyOff naturally 2-3 times (not spammy)
8. Internal references: mention the 3-phase method (Phase A breathing, Phase B posture, Phase C movement)
9. No keyword stuffing. Natural, helpful language.
10. End with a brief CTA to try BellyOff (free download)

Return ONLY a valid JSON object with these exact fields:
{
  "title": "...",
  "excerpt": "...(1-2 sentences summarizing the post)",
  "slug": "...(kebab-case, max 60 chars, in the target language romanized if needed)",
  "content": "...(full markdown body, NO frontmatter)"
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text;

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON in response for lang=${lang}`);

  const post = JSON.parse(jsonMatch[0]);

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

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`GitHub commit failed for ${lang}: ${response.status} ${err}`);
  }

  return path;
}

export default {
  async scheduled(event, env, ctx) {
    const date = new Date();
    const dayOfYear = getDayOfYear(date);
    const topic = TOPICS[dayOfYear % TOPICS.length];

    const results = [];

    for (const lang of LANGS) {
      try {
        const { frontmatter, slug } = await generatePost(topic, lang, date, env);
        const path = await commitToGitHub(frontmatter, lang, slug, date, env);
        results.push({ lang, status: 'ok', path });
        console.log(`[blog-cron] committed ${path}`);
      } catch (err) {
        results.push({ lang, status: 'error', error: err.message });
        console.error(`[blog-cron] error for ${lang}:`, err.message);
      }
    }

    console.log('[blog-cron] done:', JSON.stringify(results));
  },
};
