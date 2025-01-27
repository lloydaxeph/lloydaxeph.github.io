document.addEventListener("DOMContentLoaded", () => {
    const expContainer = document.querySelector(".exp-container");
  
    // Fetch job data from a .txt file
    fetch("jobs.txt")
      .then((response) => response.text())
      .then((data) => {
        const jobs = data.trim().split("\n\r\n"); // Split data by double line breaks (separates each job)
        jobs.forEach((job) => {
          const [jobTitle, companyInfo, jobDuration,logoName, jobDeets] = job.split("|");
          const expItem = createExpItem(jobTitle, companyInfo, jobDuration, logoName, jobDeets);
          expContainer.appendChild(expItem);
          expContainer.appendChild(document.createElement("br"));
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
    compLogo.style.backgroundImage = `url("media/${logo}")`;
    console.log(logo);
    jobVisuals.appendChild(compLogo);
  
    const jobDeets = document.createElement("div");
    jobDeets.className = "job-deets";
  
    const jobList = document.createElement("ul");
    const deets = details.split("\n");
    deets.forEach((deets) => {
      const listItem = document.createElement("li");
      listItem.textContent = deets.trim();
      jobList.appendChild(listItem);
    });
  
    jobDeets.appendChild(jobList);
    expContent.appendChild(jobVisuals);
    expContent.appendChild(jobDeets);
    
    expItem.appendChild(expHead);
    expItem.appendChild(expContent);
  
    return expItem;
  }
  