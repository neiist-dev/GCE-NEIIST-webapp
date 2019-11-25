const parser = require('parse-rss');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class ArticlesServices {
    constructor() {
        this.getArticles = getArticles;
        this.classifyArticleByTags = classifyArticleByTags;
    }
}

let articlesServices = module.exports = exports = new ArticlesServices();


async function getArticles() {
    return new Promise ( (resolve, reject) => {
        parser('https://medium.com/feed/gce-neiist', function(err, rss) {
            if (err) {
                reject(err);
            }

            let articles = [];
            for (let i = 0; i < rss.length; i++) {
                let new_article = {};
                
                new_article.title = rss[i].title;
                dom = new JSDOM("<!DOCTYPE html>" + rss[i].description);
                new_article.description = dom.window.document.querySelector('p').textContent;
                new_article.date = rss[i].date;
                new_article.link = rss[i].link;
                new_article.author = rss[i].author;
                new_article.comments = rss[i].comments;
                new_article.categories = rss[i].categories;
                new_article.image = dom.window.document.querySelector('img').src;
                new_article.tags = classifyArticleByTags(new_article);

                articles.push(new_article);
            }

            resolve(articles);
        });
    });

}
function classifyArticleByTags(article) {
    tags = [];
    if (article.title.toLowerCase().includes("à conversa com")) {
        tags.push("Interview");
    } else {
        tags.push("Article");
    }
    return tags;
}