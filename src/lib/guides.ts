// Fitness guide engine data for BellyOff.
//
// The makore.co.il lesson: one data set, many pages, each catching a real
// search and funnelling to the app. Here the data set is the evergreen
// questions people over 40 type about belly fat and short daily workouts.
//
// Authored in English and Hebrew only. Generating thin machine-translations in
// four more languages would hurt the site rather than help it, so the engine
// covers the two languages it can do well. The content is general fitness
// information, framed as such, never a medical claim, and each page says so.

export type GuideLang = 'en' | 'he';
export const GUIDE_LANGS: GuideLang[] = ['en', 'he'];

export interface GuideContent {
  title: string; // page title / the question
  metaTitle: string;
  metaDescription: string;
  short: string; // one-line answer under the H1
  intro: string;
  sections: { h: string; body: string[] }[]; // body = paragraphs or bullet lines
  faq: { q: string; a: string }[];
}

export interface Guide {
  slug: string;
  en: GuideContent;
  he: GuideContent;
}

export const GUIDES: Guide[] = [
  {
    slug: 'minutes-of-exercise-a-day-to-lose-belly-fat',
    en: {
      title: 'How many minutes of exercise a day to lose belly fat?',
      metaTitle: 'How many minutes of exercise a day to lose belly fat? | BellyOff',
      metaDescription: 'As little as 10 to 30 focused minutes a day can help reduce belly fat when done consistently. What matters most, and how to stay consistent after 40.',
      short: 'For most people, 10 to 30 consistent minutes a day is enough to make progress. Consistency beats duration.',
      intro: 'You do not need an hour in the gym to lose belly fat. What moves the needle is doing something most days, at an intensity you can sustain. Ten focused minutes done daily beats a long workout you skip.',
      sections: [
        { h: 'Why short and daily wins', body: [
          'A short daily habit is easier to keep than a long one, and consistency is what changes body composition over weeks.',
          'Belly fat responds to your overall energy balance and activity, not to any single long session.',
          'Short sessions leave you less sore, so you are more likely to show up again tomorrow.',
        ] },
        { h: 'What to do in those minutes', body: [
          'Mix simple strength moves with a little raised heart rate. Both help.',
          'Progress gradually. Adding a minute or a rep each week is real progress.',
          'Pair the movement with everyday walking, which adds up quietly.',
        ] },
      ],
      faq: [
        { q: 'Is 10 minutes a day really enough to lose belly fat?', a: 'For many people starting out, yes, if it is consistent and combined with sensible eating. Ten minutes done daily beats an hour done rarely.' },
        { q: 'How long until I see results?', a: 'Most people notice changes over several weeks, not days. The scale is slower than how your clothes fit and how you feel.' },
      ],
    },
    he: {
      title: 'כמה דקות פעילות ביום כדי להוריד שומן בטן?',
      metaTitle: 'כמה דקות פעילות ביום כדי להוריד שומן בטן? | BellyOff',
      metaDescription: 'כבר 10 עד 30 דקות ממוקדות ביום יכולות לעזור להפחית שומן בטן, אם עושים אותן בעקביות. מה הכי חשוב, ואיך שומרים על רצף אחרי גיל 40.',
      short: 'לרוב האנשים, 10 עד 30 דקות עקביות ביום מספיקות כדי להתקדם. העקביות חשובה יותר מהאורך.',
      intro: 'לא צריך שעה בחדר כושר כדי להוריד שומן בטן. מה שמזיז את המחט הוא לעשות משהו כמעט כל יום, בעצימות שאפשר להתמיד בה. עשר דקות ממוקדות בכל יום עדיפות על אימון ארוך שמדלגים עליו.',
      sections: [
        { h: 'למה קצר ויומיומי מנצח', body: [
          'הרגל יומי קצר קל יותר לשמירה מהרגל ארוך, והעקביות היא מה שמשנה את הרכב הגוף לאורך שבועות.',
          'שומן בטן מגיב למאזן האנרגיה ולפעילות הכללית, לא לאימון ארוך בודד.',
          'אימונים קצרים משאירים פחות כאב שרירים, ולכן קל יותר לחזור גם מחר.',
        ] },
        { h: 'מה עושים באותן דקות', body: [
          'משלבים תרגילי כוח פשוטים עם קצת העלאת דופק. שניהם עוזרים.',
          'מתקדמים בהדרגה. הוספת דקה או חזרה בכל שבוע היא התקדמות אמיתית.',
          'משלבים עם הליכה יומיומית, שמצטברת בשקט.',
        ] },
      ],
      faq: [
        { q: 'באמת מספיק 10 דקות ביום כדי להוריד שומן בטן?', a: 'לרבים שמתחילים, כן, אם זה עקבי ומשולב בתזונה נבונה. עשר דקות בכל יום עדיפות על שעה פעם בשבוע.' },
        { q: 'תוך כמה זמן רואים תוצאות?', a: 'רוב האנשים מבחינים בשינוי לאורך כמה שבועות, לא ימים. המשקל מגיב לאט יותר מאיך שהבגדים יושבים ואיך שמרגישים.' },
      ],
    },
  },
  {
    slug: 'does-walking-reduce-belly-fat',
    en: {
      title: 'Does walking reduce belly fat?',
      metaTitle: 'Does walking reduce belly fat? | BellyOff',
      metaDescription: 'Yes, regular brisk walking helps reduce belly fat as part of an active routine. How much to walk, and why it works especially well after 40.',
      short: 'Yes. Regular brisk walking helps, especially combined with a little strength work and sensible eating.',
      intro: 'Walking is underrated. It is low-impact, easy to sustain, and gentle on joints, which makes it one of the most repeatable ways to burn energy after 40. It will not spot-reduce your belly, but it lowers overall body fat, and the belly comes with it.',
      sections: [
        { h: 'How much walking', body: [
          'A brisk 20 to 40 minutes most days is a strong, sustainable target.',
          'Pace matters more than distance. Brisk enough to breathe harder but still talk.',
          'Two shorter walks a day count the same as one longer one.',
        ] },
        { h: 'Why it suits over 40', body: [
          'It is joint-friendly, so you can do it daily without breaking down.',
          'It is easy to attach to routine, after meals or as a commute.',
          'Pairing walks with short strength sessions protects muscle while you lose fat.',
        ] },
      ],
      faq: [
        { q: 'How many steps a day to lose belly fat?', a: 'There is no magic number, but working up toward 7,000 to 10,000 steps a day is a common, effective target when paired with sensible eating.' },
        { q: 'Is walking or running better for belly fat?', a: 'The best one is the one you will do consistently. Walking is easier to sustain after 40 and gentler on joints, which is why many people stick with it.' },
      ],
    },
    he: {
      title: 'האם הליכה מורידה שומן בטן?',
      metaTitle: 'האם הליכה מורידה שומן בטן? | BellyOff',
      metaDescription: 'כן, הליכה נמרצת קבועה עוזרת להפחית שומן בטן כחלק משגרה פעילה. כמה ללכת, ולמה זה עובד טוב במיוחד אחרי גיל 40.',
      short: 'כן. הליכה נמרצת קבועה עוזרת, במיוחד בשילוב קצת עבודת כוח ותזונה נבונה.',
      intro: 'הליכה מוערכת בחסר. היא עדינה למפרקים, קלה להתמדה, ולכן אחת הדרכים הכי חזרתיות לשרוף אנרגיה אחרי גיל 40. היא לא תמקד את הבטן לבד, אבל היא מורידה אחוז שומן כללי, והבטן יורדת יחד איתו.',
      sections: [
        { h: 'כמה ללכת', body: [
          'הליכה נמרצת של 20 עד 40 דקות ברוב ימי השבוע היא יעד חזק ובר קיימא.',
          'הקצב חשוב יותר מהמרחק. נמרץ מספיק כדי לנשום חזק אבל עדיין לדבר.',
          'שתי הליכות קצרות ביום שוות להליכה אחת ארוכה.',
        ] },
        { h: 'למה זה מתאים אחרי 40', body: [
          'ידידותי למפרקים, ולכן אפשר לעשות אותו יומית בלי להישבר.',
          'קל לחבר לשגרה, אחרי ארוחות או כדרך להגיע ליעד.',
          'שילוב הליכות עם אימוני כוח קצרים שומר על השריר בזמן ירידת השומן.',
        ] },
      ],
      faq: [
        { q: 'כמה צעדים ביום כדי להוריד שומן בטן?', a: 'אין מספר קסם, אבל התקדמות לכיוון 7,000 עד 10,000 צעדים ביום היא יעד נפוץ ויעיל בשילוב תזונה נבונה.' },
        { q: 'הליכה או ריצה עדיפות לשומן בטן?', a: 'העדיפה היא זו שתתמידו בה. הליכה קלה יותר להתמדה אחרי 40 ועדינה למפרקים, ולכן רבים נשארים איתה.' },
      ],
    },
  },
  {
    slug: 'why-belly-fat-increases-after-40',
    en: {
      title: 'Why does belly fat increase after 40?',
      metaTitle: 'Why does belly fat increase after 40? | BellyOff',
      metaDescription: 'After 40, hormonal changes, muscle loss and a slower metabolism make belly fat easier to gain. What is going on, and what actually helps.',
      short: 'A mix of hormonal change, gradual muscle loss and lower activity makes fat settle around the middle after 40.',
      intro: 'If the same habits that used to keep you lean stopped working around 40, you are not imagining it. Several changes stack up at this age, and understanding them is the first step to working with your body instead of against it.',
      sections: [
        { h: 'What changes', body: [
          'Muscle mass slowly declines with age, which lowers the calories you burn at rest.',
          'Hormonal shifts change where the body stores fat, often toward the abdomen.',
          'Daily activity tends to drop with a busier, more sedentary life stage.',
        ] },
        { h: 'What actually helps', body: [
          'Keep or rebuild muscle with short, regular strength work. This is the biggest lever.',
          'Move daily, even briefly, to offset the drop in background activity.',
          'Protect sleep and manage stress, both of which influence belly fat.',
        ] },
      ],
      faq: [
        { q: 'Is belly fat after 40 just hormones?', a: 'Hormones play a part, but muscle loss and lower daily activity matter just as much, and those two are the ones you can most directly influence.' },
        { q: 'Can you still lose belly fat after 40?', a: 'Yes. It can take a bit more consistency than it did at 25, but short daily strength work and regular movement are effective at any age.' },
      ],
    },
    he: {
      title: 'למה שומן הבטן עולה אחרי גיל 40?',
      metaTitle: 'למה שומן הבטן עולה אחרי גיל 40? | BellyOff',
      metaDescription: 'אחרי גיל 40, שינויים הורמונליים, אובדן שריר וחילוף חומרים איטי יותר מקלים על עלייה בשומן בטן. מה קורה, ומה באמת עוזר.',
      short: 'שילוב של שינוי הורמונלי, אובדן שריר הדרגתי ופחות פעילות גורם לשומן להצטבר סביב הבטן אחרי 40.',
      intro: 'אם אותם הרגלים ששמרו אתכם רזים הפסיקו לעבוד סביב גיל 40, זה לא בדמיון. כמה שינויים מצטברים בגיל הזה, והבנה שלהם היא הצעד הראשון לעבוד עם הגוף במקום נגדו.',
      sections: [
        { h: 'מה משתנה', body: [
          'מסת השריר יורדת לאט עם הגיל, וזה מוריד את הקלוריות שנשרפות במנוחה.',
          'שינויים הורמונליים משנים היכן הגוף אוגר שומן, לעיתים קרובות לכיוון הבטן.',
          'הפעילות היומית נוטה לרדת בשלב חיים עסוק ויושבני יותר.',
        ] },
        { h: 'מה באמת עוזר', body: [
          'לשמר או לבנות שריר עם עבודת כוח קצרה וקבועה. זה המנוף הגדול ביותר.',
          'לזוז כל יום, גם מעט, כדי לפצות על הירידה בפעילות הרקע.',
          'לשמור על שינה ולנהל מתח, ששניהם משפיעים על שומן הבטן.',
        ] },
      ],
      faq: [
        { q: 'שומן בטן אחרי 40 זה רק הורמונים?', a: 'להורמונים יש חלק, אבל אובדן שריר וירידה בפעילות היומית חשובים לא פחות, ועל שני אלה יש לכם את ההשפעה הישירה ביותר.' },
        { q: 'אפשר עדיין להוריד שומן בטן אחרי 40?', a: 'כן. זה עשוי לדרוש קצת יותר עקביות מאשר בגיל 25, אבל עבודת כוח קצרה יומית ותנועה קבועה יעילות בכל גיל.' },
      ],
    },
  },
  {
    slug: 'best-exercises-to-lose-belly-fat-after-40',
    en: {
      title: 'Best exercises to lose belly fat after 40',
      metaTitle: 'Best exercises to lose belly fat after 40 | BellyOff',
      metaDescription: 'The most effective moves for belly fat after 40 are not endless crunches. Strength basics plus brisk movement, in short daily sessions.',
      short: 'Short strength work plus brisk movement beats endless crunches. Crunches alone do not burn belly fat.',
      intro: 'The biggest myth is that crunches burn belly fat. They strengthen the muscle underneath, but they do not remove the fat on top. What reduces belly fat is lowering overall body fat, and for that, full-body strength and movement win.',
      sections: [
        { h: 'What to prioritise', body: [
          'Compound strength moves that use many muscles at once, like squats, hinges and pushing movements.',
          'Short bursts of raised heart rate, scaled to your fitness.',
          'Core work for posture and support, as a supplement rather than the main event.',
        ] },
        { h: 'How to do it safely after 40', body: [
          'Warm up, and progress load gradually to protect joints.',
          'Prioritise good form over speed or heavy weight.',
          'Rest is part of the plan. Muscle rebuilds between sessions, not during them.',
        ] },
      ],
      faq: [
        { q: 'Do crunches burn belly fat?', a: 'No. Crunches strengthen the abdominal muscle but do not remove the fat over it. Reducing overall body fat is what reveals the change.' },
        { q: 'Is strength or cardio better for belly fat after 40?', a: 'Both help, but strength work is especially valuable after 40 because it protects muscle, which keeps your resting calorie burn up.' },
      ],
    },
    he: {
      title: 'התרגילים הכי טובים להוריד שומן בטן אחרי 40',
      metaTitle: 'התרגילים הכי טובים להוריד שומן בטן אחרי 40 | BellyOff',
      metaDescription: 'התרגילים היעילים לשומן בטן אחרי 40 אינם כפיפות בטן אינסופיות. יסודות כוח בתוספת תנועה נמרצת, באימונים יומיים קצרים.',
      short: 'עבודת כוח קצרה ותנועה נמרצת מנצחות כפיפות בטן אינסופיות. כפיפות בטן לבדן לא שורפות שומן בטן.',
      intro: 'המיתוס הגדול הוא שכפיפות בטן שורפות שומן בטן. הן מחזקות את השריר שמתחת, אבל לא מסירות את השומן שמעל. מה שמפחית שומן בטן הוא ירידה באחוז השומן הכללי, ולשם כך כוח כל גופי ותנועה מנצחים.',
      sections: [
        { h: 'על מה לשים דגש', body: [
          'תרגילי כוח מורכבים שמפעילים הרבה שרירים יחד, כמו סקוואט, הרמה מהמותן ודחיפה.',
          'מקטעים קצרים של העלאת דופק, מותאמים לכושר שלכם.',
          'עבודת ליבה ליציבה ותמיכה, כתוספת ולא כעיקר.',
        ] },
        { h: 'איך לעשות זאת בבטחה אחרי 40', body: [
          'מתחממים, ומעלים עומס בהדרגה כדי להגן על המפרקים.',
          'מעדיפים טכניקה טובה על מהירות או משקל כבד.',
          'מנוחה היא חלק מהתוכנית. השריר נבנה בין האימונים, לא במהלכם.',
        ] },
      ],
      faq: [
        { q: 'כפיפות בטן שורפות שומן בטן?', a: 'לא. כפיפות בטן מחזקות את שריר הבטן אבל לא מסירות את השומן שמעליו. ירידה באחוז השומן הכללי היא שחושפת את השינוי.' },
        { q: 'כוח או אירובי עדיפים לשומן בטן אחרי 40?', a: 'שניהם עוזרים, אבל עבודת כוח חשובה במיוחד אחרי 40 כי היא שומרת על השריר, וזה שומר את שריפת הקלוריות במנוחה גבוהה.' },
      ],
    },
  },
  {
    slug: 'how-long-does-it-take-to-lose-belly-fat',
    en: {
      title: 'How long does it take to lose belly fat?',
      metaTitle: 'How long does it take to lose belly fat? | BellyOff',
      metaDescription: 'Most people see meaningful belly-fat change over 8 to 12 weeks of consistent effort. Why it is gradual, and how to keep going.',
      short: 'Expect meaningful change over 8 to 12 weeks of consistency, not days. Slow and steady is normal and healthy.',
      intro: 'Belly fat is often the last to go, and that is normal. A realistic, healthy pace is gradual, and chasing faster than that usually backfires. The good news is that consistent small efforts compound.',
      sections: [
        { h: 'A realistic timeline', body: [
          'First few weeks: habits form and you feel better before the mirror shows much.',
          'Weeks 8 to 12: clothes fit differently and changes become visible.',
          'Beyond that: the habit maintains the result, which is the real goal.',
        ] },
        { h: 'What speeds it up safely', body: [
          'Consistency over intensity. Showing up daily matters most.',
          'Enough protein and sleep to protect muscle and recovery.',
          'Tracking the habit, so a missed day does not become a missed month.',
        ] },
      ],
      faq: [
        { q: 'Why is belly fat the hardest to lose?', a: 'The body tends to draw from other areas first, so the belly often changes later. This is normal and not a sign that your effort is failing.' },
        { q: 'Can I lose belly fat in two weeks?', a: 'You can start building the habit and feel better in two weeks, but visible fat change is realistically a matter of a couple of months of consistency.' },
      ],
    },
    he: {
      title: 'כמה זמן לוקח להוריד שומן בטן?',
      metaTitle: 'כמה זמן לוקח להוריד שומן בטן? | BellyOff',
      metaDescription: 'רוב האנשים רואים שינוי משמעותי בשומן הבטן לאורך 8 עד 12 שבועות של עקביות. למה זה הדרגתי, ואיך ממשיכים.',
      short: 'צפו לשינוי משמעותי לאורך 8 עד 12 שבועות של עקביות, לא ימים. לאט ובבטחה זה נורמלי ובריא.',
      intro: 'שומן הבטן לרוב האחרון לרדת, וזה נורמלי. קצב מציאותי ובריא הוא הדרגתי, ורדיפה אחרי מהיר מזה בדרך כלל מתנקמת. הבשורה הטובה היא שמאמצים קטנים ועקביים מצטברים.',
      sections: [
        { h: 'ציר זמן מציאותי', body: [
          'השבועות הראשונים: נבנים הרגלים ומרגישים טוב יותר עוד לפני שהמראה מראה הרבה.',
          'שבועות 8 עד 12: הבגדים יושבים אחרת והשינוי נעשה נראה.',
          'מעבר לכך: ההרגל שומר על התוצאה, וזו המטרה האמיתית.',
        ] },
        { h: 'מה מזרז בבטחה', body: [
          'עקביות על פני עצימות. להופיע כל יום זה מה שהכי חשוב.',
          'מספיק חלבון ושינה כדי לשמור על שריר והתאוששות.',
          'מעקב אחרי ההרגל, כדי שיום שהוחמץ לא יהפוך לחודש שהוחמץ.',
        ] },
      ],
      faq: [
        { q: 'למה שומן בטן הכי קשה לרדת?', a: 'הגוף נוטה למשוך תחילה מאזורים אחרים, ולכן הבטן משתנה לרוב מאוחר יותר. זה נורמלי ואינו סימן שהמאמץ נכשל.' },
        { q: 'אפשר להוריד שומן בטן בשבועיים?', a: 'אפשר להתחיל לבנות את ההרגל ולהרגיש טוב יותר בשבועיים, אבל שינוי נראה בשומן הוא מציאותית עניין של חודשיים של עקביות.' },
      ],
    },
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
export function guideContent(g: Guide, lang: GuideLang): GuideContent {
  return lang === 'he' ? g.he : g.en;
}
