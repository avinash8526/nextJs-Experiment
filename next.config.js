// const getAllSlugs = require("./api/index").getAllSlugs;

const fetch = require("isomorphic-unfetch");

// check out https://github.com/zeit/next.js/blob/canary/examples/with-static-export/next.config.js
// to dynamic generate link for config.next.js

module.exports = {
  //   exportPathMap: function() {
  //     console.log(getAllSlugs());
  //     return {
  //       "/": { page: "/" },
  //       "/blog/hello-next-js": {
  //         page: "/blogPost",
  //         query: { slug: "hello-next-js" }
  //       }
  //     };
  //   }

  async exportPathMap() {
    // we fetch our list of posts, this allow us to dynamically generate the exported pages
    const response = await fetch(
      "https://test-cms-123.cdn.prismic.io/api/v2/documents/search?ref=XGv0NxEAAF9Wgx6o&q=[[at(document.type,%22next_blog%22)]]"
    );
    const postList = await response.json();

    // console.log(JSON.stringify(postList.results));

    // tranform the list of posts into a map of pages with the pathname `/post/:id`
    const pages = postList.results.reduce(
      (pages, post) =>
        Object.assign({}, pages, {
          [`/blog/${post.uid}`]: {
            page: "/blogPost",
            query: { slug: `${post.uid}` }
          }
        }),
      {}
    );
    console.log(JSON.stringify(pages));
    return Object.assign({}, pages, {
      "/": { page: "/" }
    });
  }
};
