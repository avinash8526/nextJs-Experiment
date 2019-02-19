function linkResolver(doc) {
  if (doc.type === "next_blog") {
    return `/blog/${doc.uid}`;
  }
  return "/";
}

module.exports = {
  linkResolver
};
