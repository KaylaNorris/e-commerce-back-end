const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const { id } = req.params;
  try {
    const tag = await Tag.findOne({
      where: { id },
      include: [Product]
    });
    if (Tag) {
      res.json(tag);
    } else {
      res.status(404).json({ message: 'Tag not found. Please check id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  try {
    const tag = await Tag.create({ tag_name });
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Error creating tag' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
    },
  });
  if (!tagData) { 
    res.status(404).json({ message: 'No tag with this id.' });
    return;
  }
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json({ message: 'Error' });
}
});

module.exports = router;
