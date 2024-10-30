import Joi from 'joi';

export const validateSupplier = (data) => {
  const schema = Joi.object({
    supplierName: Joi.string().required(),
    address: Joi.string().optional(),
    taxNo: Joi.string().optional(),
    country: Joi.string().optional(),
    mobileNo: Joi.string().optional(),
    email: Joi.string().email().optional(),
    status: Joi.string().valid('Active', 'Inactive', 'Blocked').default('Active'),
  });
  return schema.validate(data);
};

export const validateItem = (data) => {
  const schema = Joi.object({
    itemName: Joi.string().required(),
    inventoryLocation: Joi.string().optional(),
    brand: Joi.string().optional(),
    category: Joi.string().optional(),
    supplier: Joi.string().required(),
    stockUnit: Joi.string().optional(),
    unitPrice: Joi.number().optional(),
    itemImages: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('Enabled', 'Disabled').default('Enabled'),
  });
  return schema.validate(data);
};

export const validatePurchaseOrder = (data) => {
  const schema = Joi.object({
    orderDate: Joi.date().default(Date.now),
    supplier: Joi.string().required(),
    items: Joi.array().items(Joi.object({
      item: Joi.string().required(),
      stockUnit: Joi.string().optional(),
      unitPrice: Joi.number().optional(),
      packingUnit: Joi.string().optional(),
      orderQty: Joi.number().optional(),
      itemAmount: Joi.number().optional(),
      discount: Joi.number().optional(),
      netAmount: Joi.number().optional(),
    })),
    itemTotal: Joi.number().optional(),
    discount: Joi.number().optional(),
    netAmount: Joi.number().optional(),
  });
  return schema.validate(data);
};

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};
