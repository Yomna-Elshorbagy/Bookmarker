let siteNameInput = document.getElementById("siteName");
let siteURLInput = document.getElementById("urlSite");
let submitBtn = document.getElementById("submitBtn");
let tableContent = document.getElementById("tableContent");

let allSiteData = [];

if (localStorage.getItem("bookmarksList") !== null) {
  allSiteData = JSON.parse(localStorage.getItem("bookmarksList"));
  displayData();
}

function validationInputs(element) {
  let regex = {
    siteName: /^\w{3,}(\s+\w+)*$/,
    urlSite: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  };

  let text = element.value;
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function clereForm() {
  siteNameInput.value = null;
  siteURLInput.value = null;
  siteNameInput.classList.remove("is-valid");
  siteURLInput.classList.remove("is-valid");
}

function createTableCol(i) {
  let url = allSiteData[i].url.startsWith("http")
    ? allSiteData[i].url
    : `https://${allSiteData[i].url}`;
  return `    
  <tr>
   <td>${i + 1}</td>
   <td>${allSiteData[i].name}</td>
   <td>
     <a href="${url}" target="_blank" class="btn btn-color mx-3"><i class="fa-solid fa-eye pe-2"></i> Visit </a>
   </td>
    <td>
     <button class="btn btn-danger mx-3" onclick="deleteElement(${i})"> <i class="fa-solid fa-trash-can pe-2"></i> Delete </button>
   </td>
  </tr>`;
}

function displayData() {
  let cartona = "";
  for (let i = 0; i < allSiteData.length; i++) {
    cartona += createTableCol(i);
    document.getElementById("tableContent").innerHTML = cartona;
  }
}

function deleteElement(index) {
  allSiteData.splice(index, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(allSiteData));
  displayData();
}

function addData(event) {
  event.preventDefault();
  if (validationInputs(siteNameInput) && validationInputs(siteURLInput)) {
    let site = {
      name: siteNameInput.value.trim(),
      url: siteURLInput.value.trim(),
    };
    allSiteData.push(site);
    localStorage.setItem("bookmarksList", JSON.stringify(allSiteData));
    displayData();
    clereForm();
  }
}
