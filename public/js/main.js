$(document).on("click", ".save-btn", function (event) {
    event.preventDefault()
    saveArticle($(this).parent())
})

$("#scrape-btn").on("click", function (event) {
    event.preventDefault();
    axios.get("/scrape")
        .then(response => {
            renderArticles(response.data)
        })
})

function saveArticle(card) {
    let newArticle = {}
    newArticle.title = card.find(".article-title").text()
    newArticle.link = card.find(".article-link").attr("href")
    newArticle.author = card.find(".article-author").text()
    newArticle.authorLink = card.find(".author-link").attr("href")
    newArticle.imgSrc = card.find(".card-img-top").attr("src");
    axios.post("/article/save", { newArticle })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}

function renderArticles(data) {
    let $target = $("#articles-container");
    $target.empty()
    data.forEach(({ imgSrc, link, title, author, authorLink, _id}) => {
        let $card = $(`<div class="card mr-4 mb-4" style="width: 18rem;">`)
            .html(`
            <div class="card article-card article-card-flex">
                <img class="card-img-top" src="${imgSrc}" alt="Card image cap">
                <div class="card-body card-article-title">
                    <a href="${link}" target="_blank" class="card-link article-link"><h5 class="card-title article-title">${title}</h5></a>
                </div>
                <div class="card-body card-article-author">
                    <a href="${authorLink}" target="_blank" class="card-link author-link"><h6 class="card-subtitle mb-2 text-muted article-author">${author}</h6></a>
                </div>
                <button type="button" class="btn btn-primary article-btn save-btn">Save</button>
            </div>
            `)
        $target.append($card)
    })
}
