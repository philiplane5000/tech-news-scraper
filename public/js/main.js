
$("#scrape-btn").on("click", function (event) {
    event.preventDefault();
    axios.get("/scrape")
        .then(response => {
            console.log(response)
        })

})