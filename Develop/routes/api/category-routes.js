const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      where: { id },
      include: [Product]
    });
    if (Category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found. Please check id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  try {
    const category = await Category.create({ category_name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error creating category' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
})


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
    },
  });
  if (!categoryData) { 
    res.status(404).json({ message: 'No category with this id.' });
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json({ message: 'Error' });
}
});

module.exports = router;
