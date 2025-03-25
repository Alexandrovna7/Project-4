const items = [
    {
      title: "FABULOUS",
      description: "Гармония наполняет меня",
      tags: ["bright"],
      price: 500,
      img: "./img/lipstick_1.jpeg",
      rating: 4.4,
    },
    {
      title: "DREAMY",
      description: "Пришло время помечтать...",
      tags: ["nude"],
      price: 900,
      img: "./img/gloss_1.jpg",
      rating: 3.1,
    },
    {
      title: "PRETTY",
      description: "Особенно женственный и изящный",
      tags: ["bright"],
      price: 300,
      img: "./img/lipstick_2.jpeg",
      rating: 5.0,
    },
    {
      title: "FLIRTY",
      description: "Хочу флиртовать и быть в центре внимания",
      tags: ["bright"],
      price: 660,
      img: "./img/lipstick_3.jpeg",
      rating: 4.7,
    },
    {
      title: "DRAMATIC",
      description: "Нужно добавить драмы? Легко!",
      tags: ["nude", "bright"],
      price: 400,
      img: "./img/lipstick_4.jpeg",
      rating: 4.9,
    },
    {
      title: "SENSUAL",
      description: "Я чувственна как никогда",
      tags: ["nude"],
      price: 200,
      img: "./img/gloss_2.jpg",
      rating: 3.2,
    },
    {
      title: "JUICY",
      description: "Must have этого лета!",
      tags: ["nude"],
      price: 300,
      img: "./img/gloss_3.jpg",
      rating: 2.9,
    },
    {
      title: "SWETTY",
      description: "Деликатный  намек на яркие 90-е",
      tags: ["nude"],
      price: 500,
      img: "./img/gloss_5.jpg",
      rating: 3.4,
    },
    {
      title: "RETRO",
      description: "Классика в любое время",
      tags: ["nude", "bright"],
      price: 1500,
      img: "./img/lipstick_6.jpeg",
      rating: 4.8,
    },
    {
      title: "ICY",
      description: "Абсолютный бестселлер и самый модный пудровый оттенок",
      tags: ["nude", "bright"],
      price: 800,
      img: "./img/gloss_6.jpg",
      rating: 3.2,
    },
    {
      title: "VINTAGE",
      description: "Ягодный нюд",
      tags: ["bright"],
      price: 3500,
      img: "./img/lipstick_5.jpeg",
      rating: 3.7,
    },
    {
      title: "PRALINE",
      description: "Ультрамодный лиловый нюд",
      tags: ["nude"],
      price: 800,
      img: "./img/gloss_4.jpg",
      rating: 4.1,
    },
  ];
  
  let currentState = [...items];
  
  const itemsContainer = document.querySelector("#shop-items");
  
  const itemTemplate = document.querySelector("#item-template");
  
  const nothingFound = document.querySelector("#nothing-found");
  
  function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
      itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
      nothingFound.textContent = "Ничего не найдено";
    }
  }
  
  function sortByAlphabet(a, b) {
    if (a.title > b.title) {
      return 1;
    }
    
    if (a.title < b.title) {
      return -1;
    }
    
    return 0;
  }
  
  renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
  
  function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;
  
    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa", "fa-star");
      ratingContainer.append(star);
    }
  
    const tagsHolder = item.querySelector(".tags");
  
    tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      element.classList.add("tag");
      tagsHolder.append(element);
    });
    return item;
  }
  
  const searchInput = document.querySelector("#search-input");
  
  const searchButton = document.querySelector("#search-btn");
  
  function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
  
    currentState = items.filter((el) =>
      el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
  }
  
  searchButton.addEventListener("click", applySearch);
  searchInput.addEventListener("search", applySearch);
  
  const sortControl = document.querySelector("#sort");
 
  sortControl.addEventListener("change", (event) => {  
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "expensive": {
        currentState.sort((a, b) => b.price - a.price);
        break;
      }
      case "cheap": {
        currentState.sort((a, b) => a.price - b.price);
        break;
      }
      case "rating": {
        currentState.sort((a, b) => b.rating - a.rating);
        break;
      }
      case "alphabet": {
        currentState.sort((a, b) => sortByAlphabet(a, b));
        break;
      }
    }
    renderItems(currentState);
  });