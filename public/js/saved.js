//ON PAGE LOAD RENDER SAVED ARTICLES://
axios.get("/articles").then(response => {
    renderLibrary(response.data)
})

$(document).on("click", ".delete-btn", function (event) {
    event.preventDefault()
    let id = $(this).data("id");
    let selectedArticle = $(this)
    console.log(selectedArticle)
    deleteArticle(id)
})

function deleteArticle(id) {
    axios.delete(`/article/delete/${id}`)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}

function renderLibrary(data) {

    let $target = $("#articles-container");
    $target.empty()

    data.forEach(article => {
        let $card = $(`<div class="card mr-4 mb-4" style="width: 18rem;">`)
            .html(`
            <div class="card article-card">
            <img class="card-img-top" src="http://place-hold.it/180x100/666?fontsize=8" alt="Card image cap">
            <div class="card-body">
                    <a href="${article.link}" target="_blank" class="card-link article-link"><h5 class="card-title article-title">${article.title}</h5></a>
                    <a href="${article.authorLink}" target="_blank" class="card-link author-link"><h6 class="card-subtitle mb-2 text-muted article-author">${article.author}</h6></a>
                </div>
                <div class="library-btns-container">
                    <button type="button" class="btn btn-light comment-btn">Comment</button>
                    <button type="button" class="btn btn-danger delete-btn" data-id="${article._id}"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
            `)
        $target.prepend($card)
    })
}
