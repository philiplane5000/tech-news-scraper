axios.get("/articles").then(response => {
    renderLibrary(response.data)
})

function renderLibrary(data) {

    let $target = $("#articles-container");
    $target.empty()

    data.forEach(article => {
        let $card = $(`<div class="card mr-4 mb-4" style="width: 18rem;">`)
            .html(`
            <div class="card article-card">
                <img class="card-img-top" src="https://via.placeholder.com/180x100" alt="Card image cap">
                <div class="card-body">
                    <a href="${article.link}" target="_blank" class="card-link article-link"><h5 class="card-title article-title">${article.title}</h5></a>
                    <a href="${article.authorLink}" target="_blank" class="card-link author-link"><h6 class="card-subtitle mb-2 text-muted article-author">${article.author}</h6></a>
                </div>
            <button type="button" class="btn btn-warning save-btn">Save</button>
            </div>
            `)
        $target.prepend($card)
    })
}
