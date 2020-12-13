/**
 * Helper para crear los metatags
 * @param to
 */
export default function (to) {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title + ' | Antología Litelat #1';

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  let metaTags = ['og:description', 'description'];

  // Turn the meta tag definitions into actual elements in the head.
  metaTags.map(tagName => {
    const tag = document.createElement('meta');
    tag.setAttribute('property', tagName);
    tag.setAttribute('content', nearestWithTitle.meta.content);

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
}
// Fin helper para crear metatags
