const parser = require('parse-rss');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class ArticlesServices {
    constructor() {
        this.getArticles = getArticles;
    }
}

let articlesServices = module.exports = exports = new ArticlesServices();


function getArticles() {
    parser('https://medium.com/feed/gce-neiist', function(err, rss) {
    if (err) {
        console.log(err);
    }

    var stories = [];
        for (var i = rss.length - 1; i >= 0; i--) {
            var new_story = {};
            
            new_story.title = rss[i].title;
            dom = new JSDOM("<!DOCTYPE html>" + rss[i].description);
            new_story.description = dom.window.document.querySelector('p').textContent;
            new_story.date = rss[i].date;
            new_story.link = rss[i].link;
            new_story.author = rss[i].author;
            new_story.comments = rss[i].comments;
            new_story.image = dom.window.document.querySelector('img').src

            stories.push(new_story);
        }
        
    console.log(stories)
});

}