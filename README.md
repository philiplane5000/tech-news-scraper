
# Tech-News Scraper

### About

* `Tech-News-Scraper` is an app that allows users to scrape articles from popular tech sites or blogs and save favorites into a personalized `Library`.

* The `Scrape New Articles` button triggers the app to scrape the internet for new tech articles and renders them in a user-friendly view along with a `Save` button.

* `On-Click`, the `Save` button will save that particular article to the database.
    * A future version of the app will provide users on login with personalized data i.e. their own personal `Library` of articles.

* Click the `Saved Articles` tab to easily view or navigate between previously saved articles, leave personalized comments, or delete the article and all of its associated content (comments) from the database.

* `Warning(!)`: The red `Clean Slate` button in the jumbotron directly below heading `My Library` will permanently erase all of the articles from `My Library` and re-render a blank page without them.

### Summary

* `TNS` leverages `mongoose.js` to communicate with a `MongoDB` database. The on screen buttons trigger get or post requests via `express` routes to fetch or update appropriate article data -- the response is rendered in the view appropriately using `JavaScript` or `jQuery`.

* `TNS` is available to preview live on [Heroku](https://ancient-harbor-58732.herokuapp.com/) 


