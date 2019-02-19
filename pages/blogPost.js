import React, { Component } from "react";
// RichText is give to us
import { RichText } from "prismic-reactjs";
// A new API request that will create in just a tick
import { getBlogPostAPI } from "../api";
import linkResolver from "../helpers";
// Here we are reusing our layout again
import DefaultLayout from "../layouts";
import Head from "next/head";

export default class BlogPost extends Component {
  state = {
    res: null
  };
  //   static async getInitialProps(context) {
  static async getInitialProps(context) {
    console.log("getInitialProps is called");
    // we get the slug of the post so that we can
    // query the API with it
    // console.log(context);
    const { slug } = context.query;
    console.log(slug);

    const response = await getBlogPostAPI(slug);
    console.log(response);
    return {
      post: response
    };
  }

  componentDidMount() {
    console.log("componentDidMount is called");
    // getBlogPostAPI(slug)
    //   .then(data => {
    //     this.setState({ response: data });
    //   })
    //   .catch(err => console.log(err));
  }

  addJSONLD(post, info, url) {
    return {
      __html: `{
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url}"
      },
      "headline": "${post.og_title[0].text}",
      "image": [
        "${post.og_image.url}"
      ],
      "datePublished": "${info.first_publication_date}",
      "dateModified": "${info.first_publication_date}",
      "author": {
        "@type": "Person",
        "name": "Gary Meehan"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Gary Meehan",
        "logo": {
          "@type": "ImageObject",
          "url": "https://prismic-io.s3.amazonaws.com/gary-blog%2Fa64f6d7e-5c0e-4190-b852-2122e087ae2b_gm.jpg"
        }
      },
      "description": "${post.og_description[0].text}"
    }`
    };
  }

  render() {
    const post = this.props && this.props.post && this.props.post.data;

    const info = this.props && this.props.post;
    // const url = `https://www.yourdomain.ie/blog/${info.uid}`;
    if (post !== undefined) {
      return (
        <DefaultLayout>
          <Head>
            <title key="title">{post.og_title[0].text}</title>
            <meta
              key="description"
              name="description"
              content={post.og_description[0].text}
            />
            {/* <meta key="og:url" property="og:url" content={url} /> */}
            <meta key="og:type" property="og:type" content="article" />
            <meta
              key="og:title"
              property="og:title"
              content={post.og_title[0].text}
            />
            <meta
              key="og:description"
              property="og:description"
              content={post.og_description[0].text}
            />
            <meta
              key="og:image"
              property="og:image"
              content={post.og_image.url}
            />
          </Head>
          <article>
            <h1>{post.title.length ? post.title[0].text : ""}</h1>
            {/* Here we pass our rich text field to Prismics RichText renderer, along with our linkResolver */}
            {RichText.render(post.body, linkResolver)}
          </article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={this.addJSONLD(
              post,
              info,
              "http://dfdg.com"
            )}
          />
        </DefaultLayout>
      );
    }
    return null;
  }
}
