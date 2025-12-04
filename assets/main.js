async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}: ${response.status}`);
  }
  return response.json();
}

function setActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach((link) => {
    const href = link.getAttribute("href");
    const isIndex = current === "" && href === "index.html";
    if (href === current || isIndex) {
      link.classList.add("active");
    }
  });
}

async function renderProfile() {
  const container = document.querySelector("[data-profile]");
  if (!container) return;
  try {
    const data = await loadJSON("data/profile.json");
    const avatar = document.getElementById("avatar");
    const name = document.getElementById("name");
    const brand = document.getElementById("brand");
    const title = document.getElementById("title");
    const location = document.getElementById("location");
    const bio = document.getElementById("bio");
    const interests = document.getElementById("interests");
    const socials = document.getElementById("socials");

    if (avatar && data.avatar) avatar.src = data.avatar;
    if (name) name.textContent = data.name;
    if (brand) brand.textContent = data.name;
    if (title) title.textContent = data.title;
    if (location) location.textContent = data.location;
    if (bio) bio.innerHTML = data.bio;

    if (Array.isArray(data.interests) && interests) {
      interests.innerHTML = "";
      data.interests.forEach((interest) => {
        const span = document.createElement("span");
        span.className = "pill";
        span.textContent = interest;
        interests.appendChild(span);
      });
    }

    if (Array.isArray(data.social) && socials) {
      socials.innerHTML = "";
      data.social.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "meta-row";
        link.innerHTML = `<span>${item.icon || "↗"}</span><span>${item.label}</span>`;
        socials.appendChild(link);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

async function renderPublications() {
  const list = document.getElementById("publications");
  if (!list) return;
  try {
    const data = await loadJSON("data/publications.json");
    list.innerHTML = "";
    data.forEach((pub) => {
      const item = document.createElement("li");
      item.className = "pub";
      const venue = pub.venue ? `<div class="pub-meta">${pub.venue} • ${pub.year}</div>` : `<div class="pub-meta">${pub.year}</div>`;
      const tags = Array.isArray(pub.tags)
        ? `<div>${pub.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>`
        : "";
      const links = Array.isArray(pub.links)
        ? `<div class="meta" style="margin-top:8px;">${pub.links
            .map((link) => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`)
            .join(" • ")}</div>`
        : "";
      item.innerHTML = `
        <div class="pub-title">${pub.title}</div>
        ${pub.tldr ? `<div class="pub-tldr">${pub.tldr}</div>` : ""}
        <div class="pub-meta">${pub.authors}</div>
        ${venue}
        ${tags}
        ${links}
      `;
      list.appendChild(item);
    });
  } catch (err) {
    list.innerHTML = "<li>Could not load publications yet.</li>";
    console.error(err);
  }
}

async function renderAcademic() {
  const educationList = document.getElementById("academic-education");
  const awardsList = document.getElementById("academic-awards");
  const teachingList = document.getElementById("academic-teaching");
  const supervisionList = document.getElementById("academic-supervision");
  const serviceList = document.getElementById("academic-service");
  const lecturesList = document.getElementById("academic-lectures");
  if (!educationList && !awardsList && !teachingList && !supervisionList && !serviceList && !lecturesList) return;
  try {
    const data = await loadJSON("data/academic.json");
    if (educationList) {
      educationList.innerHTML = "";
      (data.education || []).forEach((ed) => {
        const item = document.createElement("li");
        item.className = "item";
        item.innerHTML = `
          <div class="item-title">${ed.institution}</div>
          <div class="item-meta">${ed.program}${ed.period ? " • " + ed.period : ""}</div>
          ${ed.gpa ? `<div class="item-notes">CGPA: ${ed.gpa}</div>` : ""}
        `;
        educationList.appendChild(item);
      });
      if (!educationList.innerHTML) educationList.innerHTML = "<li>No education listed yet.</li>";
    }

    if (awardsList) {
      awardsList.innerHTML = "";
      (data.awards || []).forEach((award) => {
        const item = document.createElement("li");
        item.className = "item";
        item.innerHTML = `
          <div class="item-title">${award.name}</div>
          <div class="item-meta">${award.organization || ""}${award.year ? " • " + award.year : ""}</div>
        `;
        awardsList.appendChild(item);
      });
      if (!awardsList.innerHTML) awardsList.innerHTML = "<li>No awards listed yet.</li>";
    }

    if (teachingList) {
      teachingList.innerHTML = "";
      (data.teaching || []).forEach((teach) => {
        const item = document.createElement("li");
        item.className = "item";
        item.innerHTML = `
          <div class="item-title">${teach.role}${teach.course ? " — " + teach.course : ""}</div>
          <div class="item-meta">${teach.institution || ""}${teach.year ? " • " + teach.year : ""}</div>
        `;
        teachingList.appendChild(item);
      });
      if (!teachingList.innerHTML) teachingList.innerHTML = "<li>No teaching listed yet.</li>";
    }

    if (supervisionList) {
      supervisionList.innerHTML = "";
      (data.supervision || []).forEach((sv) => {
        const item = document.createElement("li");
        item.className = "item";
        item.innerHTML = `
          <div class="item-title">${sv.description}</div>
          <div class="item-meta">${sv.institution || ""}${sv.year ? " • " + sv.year : ""}</div>
        `;
        supervisionList.appendChild(item);
      });
      if (!supervisionList.innerHTML) supervisionList.innerHTML = "<li>No supervision listed yet.</li>";
    }

    if (serviceList) {
      serviceList.innerHTML = "";
      (data.service || []).forEach((svc) => {
        const item = document.createElement("li");
        item.className = "item";
        const notes = svc.notes ? `<div class="item-notes">${svc.notes}</div>` : "";
        item.innerHTML = `
          <div class="item-title">${svc.role}</div>
          <div class="item-meta">${svc.venue || ""} ${svc.year ? "• " + svc.year : ""}</div>
          ${notes}
        `;
        serviceList.appendChild(item);
      });
      if (!serviceList.innerHTML) serviceList.innerHTML = "<li>No service listed yet.</li>";
    }

    if (lecturesList) {
      lecturesList.innerHTML = "";
      (data.guestLectures || []).forEach((lec) => {
        const item = document.createElement("li");
        item.className = "item";
        item.innerHTML = `
          <div class="item-title">${lec.title}</div>
          <div class="item-meta">${lec.instructor || ""}${lec.institution ? " • " + lec.institution : ""}${lec.sessions ? " • " + lec.sessions : ""}</div>
        `;
        lecturesList.appendChild(item);
      });
      if (!lecturesList.innerHTML) lecturesList.innerHTML = "<li>No guest lectures listed yet.</li>";
    }
  } catch (err) {
    if (educationList) educationList.innerHTML = "<li>Could not load education yet.</li>";
    if (awardsList) awardsList.innerHTML = "<li>Could not load awards yet.</li>";
    if (teachingList) teachingList.innerHTML = "<li>Could not load teaching yet.</li>";
    if (supervisionList) supervisionList.innerHTML = "<li>Could not load supervision yet.</li>";
    if (serviceList) serviceList.innerHTML = "<li>Could not load service yet.</li>";
    if (lecturesList) lecturesList.innerHTML = "<li>Could not load guest lectures yet.</li>";
    console.error(err);
  }
}

async function renderIndustry() {
  const list = document.getElementById("industry");
  if (!list) return;
  try {
    const data = await loadJSON("data/industry.json");
    list.innerHTML = "";
    data.forEach((role) => {
      const item = document.createElement("li");
      item.className = "item";
      const links = Array.isArray(role.links)
        ? `<div class="meta" style="margin-top:8px;">${role.links
            .map((link) => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`)
            .join(" • ")}</div>`
        : "";
      item.innerHTML = `
        <div class="item-title">${role.role}</div>
        <div class="item-meta">${role.organization}${role.location ? " • " + role.location : ""}${role.period ? " • " + role.period : ""}</div>
        ${role.summary ? `<div class="item-notes">${role.summary}</div>` : ""}
        ${links}
      `;
      list.appendChild(item);
    });
    if (!list.innerHTML) list.innerHTML = "<li>No industry experience listed yet.</li>";
  } catch (err) {
    list.innerHTML = "<li>Could not load experience yet.</li>";
    console.error(err);
  }
}

setActiveNav();
renderProfile();
renderPublications();
renderAcademic();
renderIndustry();
