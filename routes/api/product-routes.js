const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const allProducts = await Product.findAll({ include: [
      {model: Category},
      {model: Tag, through: ProductTag}
    ]})
    return res.status(200).json({ message: 'All Products Listed:', allProducts})
  } catch (err) {
    return res.status(500).json({ message: `An error occurred: ${err}`})
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag }
      ]
    });
    return res.status(200).json({ message: `Product${id}:`, product})  // Potential error here
  } catch (err) {
    return res.status(500).json({ message: `An error occurred: ${err}`})
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    // If there are product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map(tag_id => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: `Error creating product: ${err.message}` });
  }
});
// update product
router.put('/:id', async (req, res) => {
  try {
    const productUpdate = await Product.update(req.body, {
      where: { id: req.params.id }
    });

    // Update product tags if there are any to update
    if (req.body.tagIds) {
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const productTagIds = productTags.map(tag => tag.tag_id);
      const newProductTags = req.body.tagIds
        .filter(tag_id => !productTagIds.includes(tag_id))
        .map(tag_id => ({ product_id: req.params.id, tag_id }));
      const productTagsToRemove = productTags
        .filter(tag => !req.body.tagIds.includes(tag.tag_id))
        .map(tag => tag.id);

      await ProductTag.destroy({ where: { id: productTagsToRemove } });
      await ProductTag.bulkCreate(newProductTags);
    }

    res.status(200).json({ message: 'Product updated successfully!' });
  } catch (err) {
    res.status(400).json({ message: `Error updating product: ${err.message}` });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id }
    });

    if (!deletedProduct) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

module.exports = router;
