document.addEventListener("DOMContentLoaded", () => {
  const expContainer = document.querySelector(".exp-container");
  const skillsContainer = document.querySelector(".skills-container");
  const projectsContainer = document.querySelector(".projects-container");

  // Fetch job data from a JSON file
  fetch("cv_data.json")
    .then((response) => response.json())
    .then((data) => {
      const jobs = data.jobs; // Access the jobs array from the JSON
      jobs.forEach((job) => {
        const expItem = createExpItem(job.position, job.company, job.tenure, job.logo, job.desc);
        expContainer.appendChild(expItem);
        expContainer.appendChild(document.createElement("br"));
      });

      const skills = data.skills;
      skills.forEach((skill) => {
        const skillItem = createSkillItem(skill.logo, skill.name, skill.proficiency);
        skillsContainer.appendChild(skillItem);
      });

      const projects = data.projects;
      projects.forEach((project) => {
        const projectItem = createProjectItem(project.title, project.desc, project.link, project.background);
        projectsContainer.appendChild(projectItem);
      });
    })
    .catch((error) => console.error("Error loading job data:", error));
});

// Function to create a dynamic exp-item
function createExpItem(title, company, duration, logo, details) {
  const expItem = document.createElement("div");
  expItem.className = "exp-item flex-col h100";

  // Job Header (title, company, duration)
  const expHead = document.createElement("div");
  expHead.className = "exp-head flex-col";
  expHead.innerHTML = `
    <span class="job-title font-w900">${title}</span>
    <div class="job-info flex-row">
      <span class="alt-txt-clr font-w900">${company}</span>
      <b>${duration}</b>
    </div>
  `;

  // Job Content (details)
  const expContent = document.createElement("div");
  expContent.className = "exp-content flex-row";

  const jobVisuals = document.createElement("div");
  jobVisuals.className = "job-visuals";

  const compLogo = document.createElement("div");
  compLogo.className = "company-logo circle";
  compLogo.style.backgroundImage = `url("../media/${logo}")`;
  jobVisuals.appendChild(compLogo);

  const jobDeets = document.createElement("div");
  jobDeets.className = "job-deets";

  const jobList = document.createElement("ul");
  details.forEach((detail) => {
    const listItem = document.createElement("li");
    listItem.textContent = detail.trim();
    jobList.appendChild(listItem);
  });

  jobDeets.appendChild(jobList);
  expContent.appendChild(jobVisuals);
  expContent.appendChild(jobDeets);

  expItem.appendChild(expHead);
  expItem.appendChild(expContent);

  return expItem;
}

function createSkillItem(logo, name, proficiency) {
  const skillItem = document.createElement("div");
  skillItem.className = "skill-item circle flex-col";

  // Create skill-item-contents div
  const skillItemContent = document.createElement("div");
  skillItemContent.className = "skill-item-contents";

  // Create and append skill-name
  const skillName = document.createElement("b");
  skillName.className = "skill-name";
  skillName.textContent = name; // Set skill name
  skillItemContent.appendChild(skillName);

  // Create and append proficiency container
  const profContainer = document.createElement("div");

  const skillProf = document.createElement("b");
  skillProf.className = "skill-prof";
  skillProf.textContent = proficiency; // Set skill proficiency
  profContainer.appendChild(skillProf);

  const maxProfText = document.createElement("span");
  maxProfText.className = "max-prof-text";
  maxProfText.textContent = "/10"; // Add max proficiency text
  profContainer.appendChild(maxProfText);

  skillItemContent.appendChild(profContainer);

  // Append content to skill-item
  skillItem.appendChild(skillItemContent);

  // Set background image for skill-item
  skillItem.style.backgroundImage = `url("../media/${logo}")`;

  return skillItem;
}

function createProjectItem(title, descriptionList, link, background) {
  // Create projects-item container
  const projectItem = document.createElement("div");
  projectItem.className = "projects-item flex-col";
  projectItem.onclick = function () {
    window.open(link, "_blank");
  };

  // Create and append project-title
  const projectTitle = document.createElement("span");
  projectTitle.className = "project-title font-w900";
  projectTitle.textContent = title; // Set the title text
  projectItem.appendChild(projectTitle);

  // Create and append project-img div
  const projectImg = document.createElement("div");
  projectImg.className = "project-img";
  projectImg.style.backgroundImage = `url("../media/${background}")`;
  projectItem.appendChild(projectImg);

  // Create and append project-description div
  const projectDesc = document.createElement("div");
  projectDesc.className = "project-desc head-left";

  // Add "DESCRIPTION" header
  const descHeader = document.createElement("b");
  descHeader.textContent = "DESCRIPTION";
  projectDesc.appendChild(descHeader);

  // Add description list
  const descList = document.createElement("ul");
  descriptionList.forEach((descItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = descItem; // Add each description item
    descList.appendChild(listItem);
  });
  projectDesc.appendChild(descList);

  // Append the description div to the project item
  projectItem.appendChild(projectDesc);

  return projectItem;
}

