(function () {
  "use strict";

  const MAX_IDEAS = 3;

  /** Create an element with optional class and text (textContent keeps data safe). */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  /** Accept only http(s) URLs for external links. */
  function isWebUrl(value) {
    return typeof value === "string" && /^https?:\/\//i.test(value.trim());
  }

  function externalLink(href, label, ariaLabel) {
    const a = el("a", "", label);
    a.href = href.trim();
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    if (ariaLabel) a.setAttribute("aria-label", ariaLabel);
    return a;
  }

  /** Parse "YYYY-MM-DD" without timezone shifts. */
  function parseDate(iso) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!match) return null;
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  /* ---------- Ideas ---------- */
  function renderIdeas() {
    const container = document.getElementById("ideas-list");
    if (!container) return;

    const source = typeof ideas !== "undefined" && Array.isArray(ideas) ? ideas : [];
    const latest = source
      .filter((idea) => idea && idea.title && parseDate(idea.date))
      .sort((a, b) => (a.date === b.date ? b.id - a.id : a.date < b.date ? 1 : -1))
      .slice(0, MAX_IDEAS);

    if (latest.length === 0) {
      container.appendChild(el("p", "empty-note", "No ideas published yet."));
      return;
    }

    latest.forEach((idea) => {
      const item = el("article", "idea");

      const time = el("time", "", parseDate(idea.date).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric"
      }));
      time.dateTime = idea.date;
      item.appendChild(time);

      item.appendChild(el("h3", "", idea.title));
      if (idea.description) item.appendChild(el("p", "", idea.description));
      if (isWebUrl(idea.link)) {
        item.appendChild(externalLink(idea.link, "Read more", "Read more about " + idea.title));
      }
      container.appendChild(item);
    });
  }

  /* ---------- Projects ---------- */
  function renderProjects() {
    const container = document.getElementById("projects-list");
    if (!container) return;

    const source = typeof projects !== "undefined" && Array.isArray(projects) ? projects : [];
    const valid = source.filter((project) => project && project.title);

    if (valid.length === 0) {
      container.appendChild(el("p", "empty-note", "Projects will be added soon."));
      return;
    }

    valid.forEach((project) => {
      const row = el("article", "project");

      const head = el("div", "project-head");
      head.appendChild(el("h3", "", project.title));
      if (project.category) head.appendChild(el("p", "project-category", project.category));
      if (project.placeholder) head.appendChild(el("span", "project-tag", "Placeholder"));
      row.appendChild(head);

      const body = el("div", "project-body");
      if (project.description) body.appendChild(el("p", "", project.description));

      if (project.image) {
        const img = el("img", "project-image");
        img.src = project.image;
        img.alt = project.imageAlt || "";
        img.loading = "lazy";
        img.decoding = "async";
        body.appendChild(img);
      }

      if (Array.isArray(project.technologies) && project.technologies.length) {
        const tech = el("ul", "tech-list");
        tech.setAttribute("aria-label", "Technologies used");
        project.technologies.forEach((name) => tech.appendChild(el("li", "", name)));
        body.appendChild(tech);
      }

      const links = el("div", "project-links");
      if (isWebUrl(project.repo)) {
        links.appendChild(externalLink(project.repo, "GitHub repository", "GitHub repository for " + project.title));
      } else {
        links.appendChild(el("span", "pending", "Repository link not added yet"));
      }
      if (isWebUrl(project.docs)) {
        links.appendChild(externalLink(project.docs, "Documentation", "Documentation for " + project.title));
      }
      body.appendChild(links);

      row.appendChild(body);
      container.appendChild(row);
    });
  }

  renderIdeas();
  renderProjects();
})();
