$(document).on("click", ".save-btn", function(event) {
    event.preventDefault()
    saveArticle($(this))
})

$("#scrape-btn").on("click", function (event) {
    event.preventDefault();
    axios.get("/scrape")
        .then(response => {
            renderArticles(response)
        })
})

function saveArticle(card) {
    let newArticle = {}
    newArticle.title = card.attr("data-article-title")
    newArticle.link = card.prev().children().attr("href")
    console.log(newArticle)
}

function renderArticles(response) {

    console.log("RENDER ARTICLES FUNCTION")

    let $target = $("#articles-container");
    $target.empty()

    response.data.forEach(article => {

        let $card = $(`<div class="card mr-4 mb-4" style="width: 18rem;">`)
            .html(`
            <div class="card article-card">
                <img class="card-img-top" src="https://via.placeholder.com/180x100" alt="Card image cap">
                <div class="card-body">
                    <a href="${article.link}" target="_blank" class="card-link"><h5 class="card-title article-title">${article.title}</h5></a>
                    <a href="${article.authorLink}" target="_blank" class="card-link"><h6 class="card-subtitle mb-2 text-muted article-author">${article.author}</h6></a>
                </div>
            <button type="button" class="btn btn-warning save-btn" data-article-title="${article.title}">Save</button>
            </div>
            `)
        $target.append($card)
    })
}