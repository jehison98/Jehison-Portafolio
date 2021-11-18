import { skillsData } from "./_skillsData";

const skillsImgs = document.getElementById("skills-imgs");

skillsData.forEach((element) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const name = document.createElement("p");
  div.classList.add("col-3", "col-lg-3");
  img.classList.add("img-fluid");
  img.setAttribute("src", element.imgUrl);
  img.setAttribute("alt", element.name);
  img.setAttribute("data-bs-toggle", "tooltip");
  img.setAttribute("data-bs-placement", "top");
  img.setAttribute("title", element.name);
  name.textContent = element.name;
  const br = document.createElement("br");
  div.append(img);
  div.append(name);
  skillsImgs.append(div);
});
