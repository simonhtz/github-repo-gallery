// My profile info
const overview = document.querySelector(".overview");
const username = "simonhtz";
const repoList = document.querySelector(".repo-list");
// Here appears all the repo info:
const reposInfo = document.querySelector(".repos")
// Here appears the individual repo data:
const displayRepoData = document.querySelector(".repo-data")

// Fetching API from GitHub
const getName = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayInfo(data);
};
getName();

// Fetch & display user info
const displayInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
    getRepos();
};

// Fetch repos
const getRepos = async function() {
  const response = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await response.json();
  displayRepos(repoData);
};

// Display repo list
const displayRepos = function (repos) {
  for(const repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(listItem);
  }
};

// Clicking on a specific repo
repoList.addEventListener("click", function(e) {
  if(e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

// Get repo info
const getRepoInfo = async function (repoName) {
  const grabInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await grabInfo.json();
  console.log(repoInfo);
  // Fetch languages
  const fetchLanguages = await fetch (repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  // Languages list
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }

  displayRepoInfo(repoInfo, languages);
};

// Display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
  // Empty repo data section
  displayRepoData.innerHTML = "";
  displayRepoData.classList.remove("hide");
  reposInfo.classList.add("hide");
  // Add div
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  displayRepoData.append(div);
};