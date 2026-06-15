// Maps a post category to its editorial header image (shown on the blog card
// and at the top of each post). Adult, premium illustration style.

const CATEGORY_IMAGE: Record<string, string> = {
  breathing: '/blog/cat-breathing.svg',
  posture: '/blog/cat-posture.svg',
  metabolism: '/blog/cat-metabolism.svg',
  movement: '/blog/cat-movement.svg',
  mindset: '/blog/cat-mindset.svg',
  general: '/blog/cat-general.svg',
};

export function categoryImage(category: string): string {
  return CATEGORY_IMAGE[category] ?? CATEGORY_IMAGE.general;
}
