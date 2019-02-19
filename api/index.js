import Prismic from "prismic-javascript";
import { API_URL } from "../config";

const getBlogPostsAPI = async params => {
  try {
    // We initialise the API with Prismic's kit
    const API = await Prismic.api(API_URL);
    // Here we just query the documents with a filter of only returning
    // the type of blog_post and order them. Full docs can be found here:
    // https://github.com/prismicio/prismic-javascript#query-the-content

    const response = await API.query(
      Prismic.Predicates.at("document.type", "next_blog"),
      {
        orderings: "[my.next_blog.date desc]",
        ...params
        // params will be extra parameters we can pass through with api calls
        // such as how many documents to return
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

const getBlogPostAPI = async slug => {
  try {
    const API = await Prismic.api(API_URL);
    // we pass up the slug to request the correct post
    const response = await API.query(
      Prismic.Predicates.at("my.next_blog.uid", slug)
    );
    return response.results[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getAllSlugs = async () => {
  try {
    const API = await Prismic.api(API_URL);
    // we pass up the slug to request the correct post
    const response = await API.query(
      Prismic.Predicates.at("document.type", "my.next_blog.uid"),

      { pageSize: 100 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Don't forget to export newly created function
export { getBlogPostsAPI, getBlogPostAPI, getAllSlugs };
