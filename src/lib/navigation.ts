/**
 * Go to a section by id. Scrolls if it is on the current page; otherwise sets the
 * hash so App switches to the page that owns it (home, or pricing for #pricing / #process)
 * and scrolls there once rendered.
 */
export function goToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.location.hash = id;
}
