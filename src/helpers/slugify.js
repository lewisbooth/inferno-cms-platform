const slugify = text => {
  return (
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      // eslint-disable-next-line
      .replace(/[^\w\-]+/g, "")
      .replace(/_+/g, "")
      // eslint-disable-next-line
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  );
};

module.exports = slugify;
