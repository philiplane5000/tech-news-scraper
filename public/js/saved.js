//ON PAGE LOAD RENDER SAVED ARTICLES://
axios.get("/articles").then(response => {
    renderLibrary(response.data)
})

$(".clean-slate").on("click", event => {
    event.preventDefault()
    
    axios.delete("/articles/clear")
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    $("#articles-container").empty()
})

$(document).on("click", ".delete-btn", function (event) {
    event.preventDefault()
    let id = $(this).data("id");
    let $selectedArticle = $(this).parent().parent().parent().parent();
    $selectedArticle.remove()
    deleteArticle(id)
})

$(document).on("click", ".comment-btn", function (event) {
    event.preventDefault();
    let id = $(this).data("id");
    console.log(id);

    axios.get(`/article/${id}`)
        .then(response => {
            renderFinalArticle(response.data)
        })
        .catch(error => {
            console.log(error);
        });
})

$(document).on("click", ".delete-comment-btn", function (event) {
    event.preventDefault()
    let id = $(this).data("id");
    let $comment = $(this).parent();
    axios.delete(`/article/comment/${id}`)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    $comment.remove()
})

$(document).on("click", "#submit-comment", function (event) {
    event.preventDefault()
    let $article_id = $(this).data("id");

    axios.post(`/article/comment/${$article_id}`, {
        user: $("#username").val().trim(),
        body: $("#comment-text").val().trim()
    }).then(response => {

        axios.get(`/article/${$article_id}`)
            .then(response => {
                renderFinalArticle(response.data)
            })
            .catch(error => {
                console.log(error);
            });

    }).catch(error => {
        console.log(error)
    })
    $("#comment-text").val('');
    $("#username").val('');
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
    let $regularContainer = $('<div class="container">')
    $target.empty()

    data.forEach(({ link, title, author, authorLink, _id, imgSrc }) => {
        let $article = $(`
            <div class="row justify-content-center article-row">

                <div class="col-12">


                    <div class="article-outer-container" style="border: 2px solid gray;">

                        <div class="library-image-container" style="background-image: url('${imgSrc}')">
                        </div>

                        <div class="article-container">
                            <a href="${link}" target="_blank"><h4>${title}</h4></a>
                            <h5>Author: </h5><a href="${authorLink}"><h5>${author}</h5></a>
                        </div>

                        <div class="library-btns-container">
                            <button type="button" class="btn btn-light comment-btn" data-id="${_id}">Add Comment</button>
                            <button type="button" class="btn btn-danger delete-btn" data-id="${_id}">Remove From Library</button>
                        </div>

                    </div>
                </div>

            </div>
            `)
        $regularContainer.prepend($article)
    })
    $target.prepend($regularContainer)
}

function renderFinalArticle(data) {

    console.log(JSON.stringify(data, undefined, 2));

    let $target = $("#articles-container");
    $target.empty();

    //ITS OWN FUNCTION//
    $target.append(`
        <div class="row">
            <div class="col-xl-6 col-lg-7 col-md-12 col-sm-12 final-img-outer-container">
                <a href="${data.link}" target="_blank">
                    <div class="final-img-inner-container" style="background-image: url('${data.imgSrc}');">
                    </div>
                </a>
            </div>
            <div class="col-xl-6 col-lg-5 col-md-12 col-sm-12">
                <div id="article-box">
                    <a href="${data.link}" target="_blank"><h4>${data.title}</h4></a>
                    <a href="${data.authorLink}" target="_blank"><h5>${data.author}</h5></a>
                </div>
                <div id="comments-box">
                    <!--ADD COMMENT TEXTAREA AND IF THERE ARE COMMENTS: TEXTAREA + COMMENTS LISTED-->
                </div>
            </div>
        </div>
    `);

    let $commentsBox = $("#comments-box");
    if (data.comment === undefined || data.comment === null) {
        let $addComments = renderAddComment(data._id)
        $(".clean-slate").hide()
        $commentsBox.empty()
        $commentsBox.prepend($addComments)
    } else {
        let $comments = renderComments(data.comment)
        let $addComment = renderAddComment(data._id)
        $(".clean-slate").hide()
        $commentsBox.empty()
        $commentsBox.append($comments)
        $commentsBox.append($addComment)
    }
}

function renderAddComment(_id) {
    return (`
    <form>
        <div class="form-group pt-3">
            <label for="comment-text">Comment:</label>
            <textarea class="form-control" id="comment-text" rows="3"></textarea>
        </div>
        <div class="form-group pt-1">
            <input class="form-control form-control-sm" type="text" id="username" placeholder="username">
        </div>

        <button type="submit" class="btn btn-warning" id="submit-comment" data-id="${_id}">Submit</button>
    </form>
    `)
}

function renderComments({ _id, body, user }) {
    return (`
    <div class="cards-columns">

        <div class="p-3 delete-comment-btn" data-id="${_id}" style="display: inline-block; color: white; background-color: crimson; border-radius: 5px;">
            <i class="fa fa-trash fa-sm" aria-hidden="true"></i>
        </div>

        <div class="card p-3 text-right">
            <blockquote class="blockquote mb-0">
            <p>"${body}"</p>
            <footer class="blockquote-footer">
                <small class="text-muted">
                <cite title="Source Title">${user}</cite>
                </small>
            </footer>
            </blockquote>
        </div>

    </div>
    `)
}