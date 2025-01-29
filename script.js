// CONSTANTS
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const nextButton = document.querySelector('.a-right');
const prevButton = document.querySelector('.a-left');
const itemWidth = items[0].getBoundingClientRect().width;
let lastScrollTop = 0;
const topNav = document.querySelector('.top-nav');

let currentIndex = 0;

let index = 0;
let descIndex = 0;

//FUNCTIONS
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

function typeEffect(text, element, speed, highlightRanges, callback) {
    if (index < text.length) {
        let char = text[index];
        if (char === "\n") {
            element.innerHTML += "<br>";
        } else {
            let isHighlighted = false;
            highlightRanges.forEach(([start, end]) => {
                if (index >= start && index <= end) {
                    isHighlighted = true;
                    element.innerHTML += `<span class="alt-txt-clr">${char}</span>`;
                }
            });
            if (!isHighlighted) element.innerHTML += char;
        }
        index++;
        setTimeout(() => typeEffect(text, element, speed, highlightRanges, callback), speed);
    } else {
        index = 0; 
        callback();
    }
}

function introTypeEffect(callback) {
    const introText = "Hi,\nI'm Lloyd, an \nAI Software Engineer.";
    const introTextSpeed = 50;

    const typeIntro = document.getElementById("intro-text");
    typeEffect(introText, typeIntro, introTextSpeed, [[8, 12], [31, 38]], callback);
}

function introDescTypeEffect() {
    const toHighlight = ["ModelOps Engineer", "Philippines", "Lloyd Nikko Acha", "Trax Retail"];
    const startYear = 2020;

    const typeIntroDesc = document.getElementById("introDesc-text");
    const currentYear = new Date().getFullYear();

    typeIntroDesc.innerHTML = typeIntroDesc.innerHTML.replace("{yearExperience}", 
        `<span class="bld">${currentYear - startYear}</span>`) ;

    for (let i = 0; i < toHighlight.length; i++) {
        typeIntroDesc.innerHTML = typeIntroDesc.innerHTML.replace(toHighlight[i], 
            `<span class="bld">${toHighlight[i]}</span>`);
    }

    typeIntroDesc.style.opacity = 1;
    typeIntroDesc.style.transform = "translateY(0)"; 

    const introNav = document.getElementById("intro-nav");
    introNav.style.opacity = 1;
    introNav.style.transform = "translateY(0)"; 
}

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === items.length - 1;
}

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

//EVENTS
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

window.addEventListener('resize', () => {
    updateCarousel();
});

window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        topNav.style.top = '-50px'; // Hide the nav
    } else {
        // Scrolling up
        topNav.style.top = '0'; // Show the nav at the top
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
});

window.onload = () => {
    introTypeEffect(introDescTypeEffect);
};

document.addEventListener("DOMContentLoaded", () =>{
    //Containers
    const jobsContainer = document.getElementById("jobs-container");
    const projectContainer = document.querySelector(".projects-container");
    const skillContainer = document.querySelector(".skill-container");

    //Fetch data
    fetch("../cv_data.json")
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
