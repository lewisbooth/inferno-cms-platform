const mongoose = require("mongoose");
const Gallery = mongoose.model("Gallery");
const sharp = require("sharp");
const slugify = require("../helpers/slugify");

exports.getGallery = async (req, res) => {
  const gallery = await Gallery.find({})
    .sort({ _id: -1 })
    .limit(1);
  res.json(gallery[0]);
};

exports.postGallery = async (req, res) => {
  const newImages = await Gallery.findOneAndUpdate(
    {},
    { images: req.body },
    { new: true }
  );
  res.json(newImages);
};

exports.editGalleryImage = async (req, res) => {
  const newImage = {
    description: req.body.description,
    tags: req.body.tags
  };
  let gallery = await Gallery.find({})
    .sort({ _id: -1 })
    .limit(1);
  gallery[0].images[req.body.index].description = newImage.description;
  gallery[0].images[req.body.index].tags = newImage.tags;
  const newImages = await Gallery.findOneAndUpdate(
    {},
    { images: gallery[0].images },
    { new: true }
  );
  res.json(newImages);
};

exports.addGalleryImage = async (req, res) => {
  const photo = req.file.buffer;
  const description = req.body.description;
  const descriptionSlug = slugify(description);
  const tags = req.body.tags.split(",");
  const timestamp = new Date().getTime();
  const slug = `orange-tree-${descriptionSlug}-${timestamp}`;

  const newImage = {
    description,
    slug,
    tags
  };

  sharp(photo)
    // Resize to 1000px on longest side
    .resize(1000, 1000)
    .max()
    .toFormat("jpg")
    .toFile(`public/images/gallery/full-size/${slug}.jpg`)
    .then(() => {
      // Create 300x300px cropped thumbnail
      sharp(photo)
        .resize(300, 300)
        .max()
        .crop()
        .toFormat("jpg")
        .toFile(`public/images/gallery/thumbs/${slug}.jpg`)
        .then(async () => {
          // Log event
          const completed = new Date().getTime();
          console.log(
            `Image ${descriptionSlug} processed in ${completed - timestamp}ms`
          );
          // Save to database
          const oldImages = await Gallery.find({})
            .sort({ _id: -1 })
            .limit(1);
          const newImages = [newImage, ...oldImages[0].images];
          const update = await Gallery.findOneAndUpdate(
            {},
            { images: newImages },
            { new: true }
          );
          // Return new image array to client
          res.json(update);
        })
        .catch(err => {
          console.error(err);
          res.status(500);
          res.send();
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500);
      res.send();
    });
};
