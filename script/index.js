const carouselContainer = document.querySelector(".carouselCardContainer");
const leftArrowIcon = document.querySelector(".carouselLeftButton");
const rightArrowButton = document.querySelector(".carouselRightButton");

const baseURL = "https://sindrederaas.no/"
const URLPath = "wordpress/wp-json/wp/v2/"
const URLElement = "posts?_embed&per_page=4"

const fullAPIURL = baseURL + URLPath + URLElement;

async function getPosts() {
    const response = await fetch(fullAPIURL);
    const result = await response.json()
    console.log(result);
    return result;
}

function renderHTML(result) {
    result.forEach(({id, title, _embedded}) => {
        const featuredImage = _embedded['wp:featuredmedia'][0].source_url;
        const featuredAlt = _embedded['wp:featuredmedia'][0].alt_text;

        const cardContainer = document.createElement("a");
        cardContainer.classList.add("carouselContent");
        cardContainer.href = 
        carouselContainer.append(cardContainer);

        const cardImage = document.createElement("img");
        cardImage.src = featuredImage;
        cardImage.alt = featuredAlt;
        cardContainer.append(cardImage);

        const cardTitle = document.createElement("h3");
        cardTitle.innerText = title.rendered;
        cardContainer.append(cardTitle);

    });
}

async function createPage() {
    const APIFetch = await getPosts();

    renderHTML(APIFetch);
}

createPage()