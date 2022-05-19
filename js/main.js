import "../scss/main.scss";

let page = 1;
let total = 0;
const searchEl = document.querySelector("input");
const searchBtnEl = document.querySelector("button.search-btn");
const ulEl = document.querySelector("ul");
const moreBtnEl = document.querySelector("button.more-btn");
const falseEl = document.querySelector(".false");
const totalEl = document.querySelector(".total-results");
// input에서 엔터
searchEl.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    page = 1;
    searchMovie();
  }
});
//search 버튼 클릭시
searchBtnEl.addEventListener("click", async () => {
  page = 1;
  searchMovie();
});
//more 버튼
moreBtnEl.addEventListener("click", async () => {
  page += 1;
  const movies = await getMovie(searchEl.value, page);
  renderMovie(movies.Search);
});
//무한 스크롤
const movieObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) {
    page += 1;
    // console.log(page);
    // console.log(total);
    searchMovie();
    const moviePages = Math.ceil(total / 10);
    // console.log(moviePages);
    if (page > moviePages) {
      console.log(isIntersecting);
    }
  }
});
movieObserver.observe(moreBtnEl);
// movieObserver.unobserve(moreBtnEl);
//영화 정보를 찾는 함수
async function getMovie(name, page) {
  falseEl.style.display = "none";
  let res = await fetch(
    `https://www.omdbapi.com?apikey=7035c60c&s=${name}&page=${page}`
  );
  res = await res.json();
  // console.log(res);
  return res;
}
// 찾아진 정보를 렌더하는 함수
function renderMovie(movies) {
  console.log("movies : " + movies);
  movies.forEach((movie) => {
    const liEl = document.createElement("li");
    ulEl.append(liEl);
    const titleEl = document.createElement("div");
    titleEl.textContent = "Title : " + movie.Title;
    liEl.append(titleEl);
    const imgEl = document.createElement("img");
    imgEl.src = movie.Poster === "N/A" ? "./images/noImage.png" : movie.Poster;
    liEl.append(imgEl);
  });
  moreBtnEl.style.display = "block";
}

//영화 정보를 찾고 렌더하는 함수
async function searchMovie() {
  const movies = await getMovie(searchEl.value, page);
  const { Search, totalResults, Response } = movies;
  total = totalResults;
  totalEl.innerHTML = "Total Results : " + totalResults;
  if (Response === "True") {
    if (page === 1) ulEl.innerHTML = "";
    renderMovie(Search);
  } else if (Response === "False") {
    ulEl.innerHTML = "";
    falseEl.style.display = "block";
    moreBtnEl.style.display = "none";
  }
}
