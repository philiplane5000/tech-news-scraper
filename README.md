
# Tech-News-Scraper

### About

* `Tech-News-Scraper` is an app that allows users to scrape articles from popular tech sites or blogs and save their favorites into a personalized library.

* The `Scrape New Articles` button triggers the app to scrape the internet for new tech articles, rendering them in the browser in a user-friendly fashion. Each article comes with a purple `Save` button.

* The `Save` button `on-click` will save that particular article to the database.

* Click the `Saved Articles` tab to easily view or navigate between previously saved articles, leave personalized comments, or delete the article and all of its associated content (comments) from the database.

* `Warning(!)`: The red `Clean Slate` button in the jumbotron directly below heading `My Library` will permanently erase all of the articles from `My Library` and re-render a blank page without them.

### Summary

* `TNS` leverages `mongoose.js` to communicate with a `MongoDB` database hosted in the cloud with `Heroku`. The on-screen buttons trigger the appropriate request via `express` routing to fetch or update a respective articles data -- the response is rendered in the browser using `JavaScript` or `jQuery`.

* Preview `Tech-News-Scraper` LIVE on [Heroku](https://ancient-harbor-58732.herokuapp.com/) 

### Under Construction

* `Users` will login to access to their personalized `Library` of articles.


