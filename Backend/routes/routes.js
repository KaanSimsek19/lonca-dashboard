const express = require("express");
const router = express.Router();
const ParentProduct = require('../models/ParentProducts');
const Order = require('../models/Orders');
const Vendor = require("../models/Vendor")

router.get("/vendor/:vendorId/sale", async (req, res) => {
    try {
      // Fetch the vendor by ID
      const vendor = await Vendor.findById(req.params.vendorId);
  
      // Aggregate the orders
      Order.aggregate([
        { $unwind: "$cart_item" },
        {
          $lookup: {
            from: "parent_products",
            localField: "cart_item.product",
            foreignField: "_id",
            as: "parentProduct"
          }
        },
        { $unwind: "$parentProduct" },
        {
          $match: {
            "parentProduct.vendor": vendor._id
          }
        },
        {
          $group: {
            _id: '$parentProduct.name',
            totalSold: { $sum: '$cart_item.quantity' },
          },
        }
      ])
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } catch (error) {
      console.error('Error fetching vendor:', error);
      res.status(500).send('An error occurred while fetching vendor data.');
    }
  });

  router.get("/vendor/:vendorId/monthly-sales", async (req, res) => {
    try {
        // Aggregate the orders
        const monthlySales = await Order.aggregate([
          {
            $unwind: "$cart_item",
          },
          {
            $lookup: {
              from: "parent_products",
              localField: "cart_item.product",
              foreignField: "_id",
              as: "parentProduct",
            },
          },
          { $unwind: "$parentProduct" },
          {
            $group: {
              _id: {
                year: { $year: "$payment_at" },
                month: { $month: "$payment_at" },
              },
              totalSold: { $sum: "$cart_item.quantity" },
            },
          },
          {
            $sort: { "_id.year": 1, "_id.month": 1 },
          },
        ]);
    
        res.json({ success: true, monthlySales: monthlySales });
      } catch (error) {
        console.error('Error fetching monthly sales:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching monthly sales data.' });
      }
    });

    router.post("/vendor/login", async (req, res) => {
        vendorId = req.body.vendorId;
        vendorName = req.body.vendorName
        const vendor = await Vendor.findById(vendorId)
        if(vendor.name == vendorName){
            res.json({ success: true});
        }
        else{
            res.status(500).json({ success: false, message: 'An error occurred while fetching monthly sales data.' });
        }
    })
    
    module.exports = router;
  
