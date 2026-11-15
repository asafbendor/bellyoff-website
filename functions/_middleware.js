// www.bellyoff.app and the bare bellyoff-website.pages.dev are attached to this Pages
// project and used to serve the whole site with 200. _redirects cannot match on host,
// so the permanent redirect to the apex lives here. Preview hosts
// (<hash>.bellyoff-website.pages.dev) and everything else pass straight through.
const NON_CANONICAL = new Set(['www.bellyoff.app', 'bellyoff-website.pages.dev']);
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (NON_CANONICAL.has(url.hostname)) {
    return Response.redirect(`https://bellyoff.app${url.pathname}${url.search}`, 301);
  }
  return context.next();
}
