/*
 * Latest Ideas
 * ------------
 * Add a new idea by adding an object to this array and committing the change.
 * The site shows only the three newest ideas (by date, then by id).
 * Older ideas can stay here; they are simply not displayed.
 *
 * Fields:
 *   id          unique number (higher = newer when dates are equal)
 *   title       short title
 *   date        publication date as "YYYY-MM-DD"
 *   description one or two sentences
 *   link        optional URL ("" for none)
 */
const ideas = [
  {
    id: 1,
    title: "Exploring Network Monitoring",
    date: "2026-11-06",
    description: "An idea for monitoring network activity using open-source tools.",
    link: ""
  },

  {
    id: 2,
    title: "TEST-IDEA",
    date: "2026-11-06",
    description: "TEST_DESCRIPTION",
    link: ""
  }
];
