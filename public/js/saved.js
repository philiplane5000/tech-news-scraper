//ON PAGE LOAD RENDER SAVED ARTICLES://
axios.get("/articles").then(response => {
    renderLibrary(response.data)
})

$(".clean-slate").on("click", function (event) {
    event.preventDefault()
    $("#articles-container").empty()
})

$(document).on("click", ".comment-btn", function (event) {
    event.preventDefault();
    let id = $(this).data("id");

    axios.get(`/article/${id}`)
        .then(function (response) {
            renderFinalArticle(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

})

$(document).on("click", ".delete-btn", function (event) {
    event.preventDefault()
    let id = $(this).data("id");
    let $selectedArticle = $(this).parent().parent().parent().parent();
    $selectedArticle.remove()
    // console.log(JSON.stringify($selectedArticle,undefined, 2))
    // deleteArticle(id)
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

    data.forEach(({ link, title, author, authorLink, _id }) => {
        let $article = $(`
            <div class="row justify-content-center article-row">

                <div class="col-10">

                    <div class="article-outer-container" style="border: 2px solid gray;">

                        <div class="article-container">
                            <a href="${link}" target="_blank"><h4>${title}</h4></a>
                            <h5>Author: </h5><a href="${authorLink}"><h5>${author}</h5></a>
                        </div>

                        <div class="library-btns-container">
                            <button type="button" class="btn btn-light comment-btn" data-id="${_id}">Comment</button>
                            <button type="button" class="btn btn-danger delete-btn" data-id="${_id}">Remove From Library</button>
                        </div>

                    </div>
                </div>

            </div>
            `)
        $target.prepend($article)
    })
}

function renderFinalArticle({_id, title, link, author, authorLink, comment}) {
    // console.log(JSON.stringify(data,undefined,2));
    console.log(_id)
    console.log(title)
    console.log(link)
    console.log(author)
    console.log(authorLink)
    console.log(comment._id)
    console.log(comment.body)
    console.log(comment.user)

    $("#articles-container").empty()


}