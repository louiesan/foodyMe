if (window.localStorage.getItem("fav") === null) {
  window.localStorage.setItem("fav", JSON.stringify([]));
} else {
  check();
}
// GETTING BTNS :
let sBtn = document.getElementById("srchBtn");
let favSec = document.querySelectorAll(".star");
let srchBar = document.getElementById("searchbar");
let mobMen = document.querySelector("#mobileM .fa-bars");

//GETTING ELEMENTS :
let toasty = document.getElementById("toast");
let schEle = document.getElementById("sEle");
let content = document.getElementById("Recipes");
let cards = document.getElementById("cards");
let search;
// CONDITIONS
let isSearch = false;
let isTst = false;

// Intreactions:
sBtn.addEventListener("click", (e) => {
  if (!isSearch) {
    e.target.classList.replace("fa-magnifying-glass", "fa-xmark");
    showSearch();
  } else {
    e.target.classList.replace("fa-xmark", "fa-magnifying-glass");
    showSearch();
  }
});

favSec.forEach((e) => {
  e.onclick = () => {
    check();
    blur();
    document
      .getElementById("stars")
      .classList.replace("opacity-0", "opacity-100");
    document.getElementById("stars").classList.replace("hidden", "flex");
    document.getElementById("closer").onclick = () => {
      blur();
      document.getElementById("stars").classList.replace("flex", "hidden");
      document
        .getElementById("stars")
        .classList.replace("opacity-100", "opacity-0");
    };
  };
});

srchBar.addEventListener("change", (e) => {
  search = e.target.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let dele;
      let fav;
      let item;
      let favs = [];
      content.classList.replace("hidden", "flex");
      cards.innerHTML = "";
      if (data.meals !== null) {
        data.meals.forEach((element) => {
          let div = document.createElement("div");
          div.setAttribute("class", "view");
          cards.appendChild(div);
          let ingredients = [];
          for (let i = 1; i <= 20; i++) {
            let ingredient = element[`strIngredient${i}`];
            if (ingredient !== "" && ingredient !== null) {
              ingredients.push(ingredient);
            }
          }
          let inghredient = ingredients.join(" | ");
          div.classList.add(
            "flex",
            "flex-col",
            "justify-around",
            "items-center",
            "w-[250px]",
            "h-[300px]",
            "p-2.5",
            "rounded-[10px]",
            "bg-violet-500/30",
            "shadow-[0px_0px_10px_5px]",
            "sm:shadow-xl",
            "shadow-blue-600/40"
          );
          let img = document.createElement("img");
          div.appendChild(img);
          img.setAttribute("src", `${element.strMealThumb}`);
          img.setAttribute("alt", `${element.strMeal} Image`);
          img.classList.add(
            "w-[150px]",
            "rounded-xl",
            "border-2",
            "border-black",
            "hover:scale-105",
            "transition-all",
            "duration-500",
            "ease-in-out"
          );
          let h1 = document.createElement("h1");
          div.appendChild(h1);
          h1.innerHTML = `${element.strMeal}`;
          h1.classList.add(
            "text-2xl",
            "text-black",
            "text-center",
            "font-[system-ui]"
          );
          let btn = document.createElement("button");
          div.appendChild(btn);
          btn.innerText = "More Details";
          btn.classList.add(
            "text-white",
            "px-2.5",
            "py-1.5",
            "rounded-[8px]",
            "bg-indigo-300",
            "cursor-pointer",
            "shadow-black",
            "shadow-[0px_0px_5px_1px]",
            "transition-all",
            "duration-500",
            "ease-in-out",
            "hover:scale-110"
          );
          btn.addEventListener("click", () => {
            document.getElementById("container").style.top =
              window.scrollY + 100 + "px";
            blur();
            let isFavorite;
            let comapring = JSON.parse(window.localStorage.getItem("fav"));
            if (comapring !== null) {
              comapring.some((c) => {
                if (
                  c.name === element.strMeal &&
                  c.src === element.strMealThumb
                ) {
                  isFavorite = true;
                }
              });
            } else {
              isFavorite = false;
            }
            document.getElementById("recipes").innerHTML = `<button id="del"
         
          class=" absolute top-0 right-0  text-red-500 cursor-pointer w-[30px] h-[30px]"
        >
          <img class="w-20" src="/assest/close.gif" alt="close-gif" />
        </button>
        <div
          class="flex flex-row flex-wrap justify-around items-center gap-2.5"
        >
          <img
            class="w-32 rounded-2xl"
            src="${element.strMealThumb}"
            alt=""
          />
          <div class="w-full sm:w-[60%]">
            <h1 class="text-black font-bold font-overpass text-xl">
              Name:
              <span class="text-white font-aleo font-medium text-[18px]"
                >${element.strMeal}</span
              >
            </h1>
            <h2 class="text-black font-bold font-overpass text-xl">
              Area:
              <span class="text-white font-aleo font-medium text-[18px]"
                >${element.strArea}</span
              >
            </h2>
            <h2 class="text-black font-bold font-overpass text-xl">
              Ingredients:
              <span class="text-white font-aleo font-medium text-[18px]"
                >${inghredient}</span
              >
            </h2>
          </div>
        </div>
        <div>
          <h1 class="text-2xl text-black font-extrabold font-aleo">
            Instruction:
          </h1>
          <p class="text-cyan-100 font-overpass font-light text-[17px]">${
            element.strInstructions
          }</p>
        </div>
        <div class="flex flex-wrap justify-around items-center mt-2.5">
            ${
              isFavorite
                ? `<button id="rem" data-name="${element.strMeal}" class="hover:shadow-[0px_2px_12px_3px_mistyrose] cursor-pointer hover:text-orange-300 transition-all ease-in-out duration-500 flex justify-center gap-1.5 items-center w-[45%] sm:text-xl text-center px-1.5 py-2.5 rounded-xl bg-blue-200 text-sm text-white">Remove <img class="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 place-content-center" src="../assest/delete.gif" alt="remove">`
                : `<button id="fav" class="hover:shadow-[0px_2px_12px_3px_mistyrose] cursor-pointer hover:text-orange-300 transition-all ease-in-out duration-500 flex justify-center gap-1.5 items-center w-[45%] sm:text-xl text-center px-1.5 py-2.5 rounded-xl bg-blue-200 text-sm text-white">Add to favorite <img class="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 place-content-center" src="../assest/menu.gif" alt="fav">`
            }
          </button>
          <a
            href="${element.strYoutube}"
            class="hover:shadow-[0px_2px_12px_3px_rosybrown] hover:text-rose-500 transition-all ease-in-out duration-500 flex justify-center gap-1.5 items-center w-[45%] sm:text-xl text-center px-1.5 py-2.5 rounded-xl bg-blue-200 text-sm text-white"
            >See How?                         <img
              class="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 place-content-center"
              src="../assest/YT.gif"
              alt="favorite"
            /></a
          >
        </div>
      </div>`;
            dele = document.getElementById("del");
            fav =
              document.getElementById("fav") || document.getElementById("rem");
            dele.onclick = () => {
              blur();
              document
                .getElementById("container")
                .classList.replace("flex", "hidden");
            };
            // HONNA TAWA9AFT
            fav.onclick = () => {
              item = {
                name: `${element.strMeal}`,
                src: `${element.strMealThumb}`,
              };
              addOrRem(fav, favs, item);
            };

            document
              .getElementById("container")
              .classList.replace("hidden", "flex");
          });
        });
      } else {
        cards.innerHTML = `<div class="w-full h-fit flex flex-col justify-center items-center gap-2.5">
      <h1 class="text-xl sm:text-3xl font-aleo text-gray-900/80 font-medium">Sorry We did not found any Results:</h1>
      <img class="w-96" src="../assest/empty2.gif" alt="">
      </div>`;
      }
    });
});

// Functions :

function showSearch() {
  if (!isSearch) {
    schEle.classList.replace("sm:h-0", "sm:h-[50px]");
    isSearch = true;
  } else {
    schEle.classList.replace("sm:h-[50px]", "sm:h-0");
    isSearch = false;
  }
}

function addOrRem(butto, favs, item) {
  favs = JSON.parse(window.localStorage.getItem("fav"));
  if (butto.innerText === "Add to favorite") {
    if (!favs.some((f) => f.name === item.name && f.src === item.src)) {
      favs.push(item);
    }
    console.log(favs);
    console.log(window.localStorage.getItem("fav"));
    if (
      !window.localStorage.getItem("fav") ||
      !window.localStorage.getItem("fav").includes(JSON.stringify([item]))
    ) {
      window.localStorage.setItem("fav", JSON.stringify(favs));
    }
    butto.innerHTML = `Remove <img
              class="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 place-content-center"
              src="../assest/delete.gif"
              alt="favorite"
            />`;
    isTst = true;
    toast(isTst);
  } else {
    butto.innerHTML =
      'Add to favorite <img class="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 place-content-center" src="../assest/menu.gif" alt="fav">';
    remove(item.name);
  }
}

function blur() {
  document.querySelectorAll(".blured").forEach((b) => {
    if (b.classList.contains("blur-none")) {
      b.classList.replace("blur-none", "blur-md");
      b.classList.replace("pointer-events-auto", "pointer-events-none");
    } else {
      b.classList.replace("blur-md", "blur-none");
      b.classList.replace("pointer-events-none", "pointer-events-auto");
    }
  });
}

function remove(item) {
  let remove = JSON.parse(window.localStorage.getItem("fav"));
  let removed = [];
  isTst = false;
  toast(isTst);
  remove.forEach((e) => {
    if (e.name !== item) {
      removed.push(e);
    }
  });
  window.localStorage.setItem("fav", JSON.stringify(removed));
}

function check() {
  let checking = JSON.parse(window.localStorage.getItem("fav"));
  if (checking && checking.length !== 0) {
    console.log("fine accepted");
    if (
      document.getElementById("bards").innerText.includes("favorites") ||
      document.getElementById("bards").innerHTML == ""
    ) {
      console.log("sorry accepted");
      document.getElementById("bards").innerHTML = "";
      checking.forEach((e) => {
        document.getElementById(
          "bards"
        ).innerHTML += `<div class="view flex flex-row flex-nowrap justify-around items-center w-[90%] h-[90px] sm:h-28 p-2.5 rounded-[10px] bg-violet-500/30 shadow-[0px_0px_10px_5px] sm:shadow-xl shadow-blue-600/40"><img src="${e.src}" alt="Chicken Congee Image" class="w-[50px] sm:w-[90px] rounded-xl border-2 border-black hover:scale-105 transition-all duration-500 ease-in-out"><h1 class="text-sm sm:text-2xl text-black text-center font-[system-ui]">${e.name}</h1><button data-name="${e.name}" class="remo flex items-center justify-center text-white px-2.5 py-1.5 sm:w-[100px] rounded-[8px] bg-indigo-300 cursor-pointer shadow-black shadow-[0px_0px_5px_1px] transition-all duration-500 ease-in-out hover:scale-110">Remove<img class="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 place-content-center" src="../assest/delete.gif" alt="remove"></button></div>`;
      });
      document.querySelectorAll(".remo").forEach((r) => {
        r.addEventListener("click", () => {
          remove(r.getAttribute("data-name"));
          console.log(r.getAttribute("data-name"));
          r.parentElement.remove();
        });
      });
    } else if (document.getElementById("bards").innerHTML !== "") {
      console.log("bards accepted");
      checking.forEach((e) => {
        if (document.getElementById("bards").innerText.includes(e.name)) {
          console.log("first condi");
          return;
        } else {
          console.log("second condi");
          document.getElementById(
            "bards"
          ).innerHTML += `<div class="view flex flex-row flex-nowrap justify-around items-center w-[90%] h-[90px] sm:h-28 p-2.5 rounded-[10px] bg-violet-500/30 shadow-[0px_0px_10px_5px] sm:shadow-xl shadow-blue-600/40"><img src="${e.src}" alt="Chicken Congee Image" class="w-[50px] sm:w-[90px] rounded-xl border-2 border-black hover:scale-105 transition-all duration-500 ease-in-out"><h1 class="text-sm sm:text-2xl text-black text-center font-[system-ui]">${e.name}</h1><button class="remo flex items-center justify-center text-white px-2.5 py-1.5 sm:w-[100px] rounded-[8px] bg-indigo-300 cursor-pointer shadow-black shadow-[0px_0px_5px_1px] transition-all duration-500 ease-in-out hover:scale-110">Remove<img class="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 place-content-center" src="../assest/delete.gif" alt="remove"></button></div>`;
        }
        document.querySelectorAll(".remo").forEach((r) => {
          r.addEventListener("click", () => {
            remove(r.getAttribute("data-name"));
            console.log(r.getAttribute("data-name"));
            r.parentElement.remove();
          });
        });
      });
    }
  } else {
    console.log("third condi");
    document.getElementById(
      "bards"
    ).innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center">
    <h4 class="font-overpass text-base sm:text-lg text-cyan-950 text-center" >Sorry but We Did not Found any favorites</h4>
    <img src="../assest/newon.gif" class= "w-60" alt="nothingGif"/>
    </div>`;
  }
}

function toast(tst) {
  if (tst) {
    let div = document.createElement("div");
    let secDiv = document.createElement("div");
    let icon = document.createElement("i");
    let title = document.createElement("h1");
    let par = document.createElement("p");
    let btn = document.createElement("button");
    div.classList.add(
      "animate-taosted",
      "relative",
      "toasty",
      "success",
      "w-80",
      "h-16",
      "bg-linear-60",
      "from-green-400",
      "to-[#010031]",
      "to-50%",
      "rounded-lg",
      "flex",
      "flex-row",
      "flex-nowrap",
      "justify-around",
      "items-center",
      "gap-2.5",
      "m-2.5",
      "p-5"
    );
    toasty.appendChild(div);
    icon.classList.add(
      "fa-solid",
      "fa-circle-check",
      "text-xl",
      "text-green-400"
    );
    div.appendChild(icon);
    div.appendChild(secDiv);
    title.classList.add("text-xl", "text-green-500", "font-aleo");
    title.innerText = "Added";
    par.classList.add("text-sm", "text-cyan-950", "font-overpass");
    par.innerText = "Recipe has been added to favorites!";
    secDiv.appendChild(title);
    secDiv.appendChild(par);
    btn.innerText = "X";
    btn.classList.add("font-[cursive]", "cursor-pointer", "text-white");
    div.appendChild(btn);
    btn.onclick = () => btn.parentElement.remove();
    setInterval(() => {
      div.remove();
    }, 6000);
  } else {
    let div = document.createElement("div");
    let secDiv = document.createElement("div");
    let icon = document.createElement("i");
    let title = document.createElement("h1");
    let par = document.createElement("p");
    let btn = document.createElement("button");
    div.classList.add(
      "animate-taosted",
      "relative",
      "toasty",
      "removed",
      "w-80",
      "h-16",
      "bg-linear-60",
      "from-blue-400",
      "to-[#010031]",
      "to-50%",
      "rounded-lg",
      "flex",
      "flex-row",
      "flex-nowrap",
      "justify-around",
      "items-center",
      "gap-2.5",
      "m-2.5",
      "p-5"
    );
    toasty.appendChild(div);
    icon.classList.add(
      "fa-solid",
      "fa-circle-info",
      "text-xl",
      "text-[#74C0FC]"
    );
    div.appendChild(icon);
    div.appendChild(secDiv);
    title.classList.add("text-xl", "text-blue-400", "font-aleo");
    title.innerText = "Removed";
    par.classList.add("text-sm", "text-cyan-950", "font-overpass");
    par.innerText = "Recipe has been Removed!";
    secDiv.appendChild(title);
    secDiv.appendChild(par);
    btn.innerText = "X";
    btn.classList.add("font-[cursive]", "cursor-pointer", "text-white");
    div.appendChild(btn);
    btn.onclick = () => btn.parentElement.remove();
    setInterval(() => {
      div.remove();
    }, 6000);
    div.onmouseenter;
  }
}
