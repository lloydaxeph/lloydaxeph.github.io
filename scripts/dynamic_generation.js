document.addEventListener("DOMContentLoaded", () =>{
    //Containers
    const jobsContainer = document.getElementById("jobs-container");
    const projectContainer = document.querySelector(".projects-container");
    const skillContainer = document.querySelector(".skill-container");

    //Fetch data
    fetch("cv_data.json")
    .then((response) => response.json())
    .then((data) => {
      //JOBS
      const jobs = data.jobs;
      jobs.forEach((job) => {
          const jobItem = createJobItem(job.position, job.tenure, job.company,job.type, job.remote, job.logo, job.desc);
          jobsContainer.appendChild(jobItem);
      });

      //PROJECTS
      const projects = data.projects;
      projects.forEach((project) => {
          const projectItem = createProjectItem(project.title, project.background, project.desc, project.link);
          projectContainer.appendChild(projectItem);
      });

      //SKILLS
      const skills = data.skills;
      skills.forEach((skill) => {
          const projectItem = createSkillItem(skill.name, skill.proficiency, skill.logo);
          skillContainer.appendChild(projectItem);
      });
    })
    .catch((error) => console.error("Error loading job data:", error));
});

// FUNCTIONS --------------------------------------------------
function createJobItem(position, tenure, company, employmentType, remote, logo, details) {
    const jobItem = document.createElement("div");
    jobItem.className = "job-item w100 h100";
  
    // Section-1: Job Logo
    const jobLogo = document.createElement("div");
    jobLogo.className = "job-logo";
    jobLogo.style.backgroundImage = `url("../media/${logo}")`;
    
    // Section-2: Job Text
    const jobText = document.createElement("div");
    jobText.className = "job-text flex-col w100";
  
    // Line
    const line1 = document.createElement("div");
    line1.className = "line bg-color2";
  
    // Job Head
    const jobHead = document.createElement("div");
    jobHead.className = "job-head flex-row flex-between w100";
  
    const jobPosition = document.createElement("div");
    jobPosition.className = "position";
    jobPosition.innerHTML = `<b class="font-w900">${position}</b>`;
  
    const jobTenure = document.createElement("div");
    jobTenure.className = "tenure";
    jobTenure.innerHTML = `<b class="font-w900" style="letter-spacing: -2px;">${tenure}</b>`;
  
    jobHead.appendChild(jobPosition);
    jobHead.appendChild(jobTenure);
  
    // Line
    const line2 = document.createElement("div");
    line2.className = "line bg-color2";
  
    // Company Info
    const companyInfo = document.createElement("div");
    companyInfo.className = "company";
    let spanContent = `<span>${company} &#8226; ${employmentType}</span>`;
    if (remote) {
      spanContent = `<span>${company} &#8226; ${employmentType} &#8226; Remote</span>`;
    }
    companyInfo.innerHTML = spanContent;
  
    // Line
    const line3 = document.createElement("div");
    line3.className = "line bg-color2";
  
    // Details Section
    const deets = document.createElement("div");
    deets.className = "deets h100";
    
    const deetsWrapper = document.createElement("div");
    
    const jobDetails = document.createElement("ul");
    jobDetails.className = "job-deets";
    
    details.forEach(detail => {
      const listItem = document.createElement("li");
      listItem.textContent = detail.trim();
      jobDetails.appendChild(listItem);
    });
    
    deetsWrapper.appendChild(jobDetails);
    deets.appendChild(deetsWrapper);
    
    // Append all elements
    jobText.appendChild(line1);
    jobText.appendChild(jobHead);
    jobText.appendChild(line2);
    jobText.appendChild(companyInfo);
    jobText.appendChild(line3);
    jobText.appendChild(deets);
  
    jobItem.appendChild(jobLogo);
    jobItem.appendChild(jobText);
    console.log(jobItem);
    return jobItem;
  }

function createProjectItem(title, image, description, link) {
    const projectItem = document.createElement("div");
    projectItem.className = "project-item floater-small bg-color2";
    projectItem.onclick = function () {
      window.open(link, "_blank");
    };
  
    // Create and append project title
    const projectTitle = document.createElement("div");
    projectTitle.className = "project-title font-w900 text-center";
    projectTitle.textContent = title; // Set project title
    projectItem.appendChild(projectTitle);
  
    // Create and append project image container
    const projectImgContainer = document.createElement("div");
    projectImgContainer.className = "project-img";
  
    // Set background image for the project image container
    projectImgContainer.style.backgroundImage = `url("../media/${image}")`;
    projectItem.appendChild(projectImgContainer);
  
    // Create and append project details
    const projectDetails = document.createElement("div");
    projectDetails.className = "project-details";
    projectDetails.textContent = description; // Set project description
    projectItem.appendChild(projectDetails);
  
    return projectItem;
  }

function createSkillItem(name, proficiency, logo) {
    const skillItem = document.createElement("div");
    skillItem.className = "skill-item floater-small";

    const skillItemContent = document.createElement("div");
    skillItemContent.className = "skill-item-contents";
  
    // Create and append skill name
    const skillName = document.createElement("b");
    skillName.className = "skill-name font-w900";
    skillName.textContent = name; // Set skill name
    skillItemContent.appendChild(skillName);
  
    // Create proficiency container
    const profContainer = document.createElement("div");
  
    // Create and append proficiency value
    const skillProf = document.createElement("b");
    skillProf.className = "skill-prof";
    skillProf.textContent = `${proficiency}%`; // Set proficiency percentage
    profContainer.appendChild(skillProf);
  
    skillItemContent.appendChild(profContainer);

    skillItem.style.backgroundImage = `url("../media/${logo}")`;
    skillItem.appendChild(skillItemContent);
    return skillItem;
  }
  
  