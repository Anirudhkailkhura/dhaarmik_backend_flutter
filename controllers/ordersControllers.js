const  Order =require("../models/Order")

module.exports= {
    getUserOrder : async (req, res )=> {
        const userId = req.user.id;
        try {
          const userOrders = await Orders.find({userId})
          .populate({
            path:"productId",
            select: '-size -oldPrice -discription -category'
          }).exec();

        } catch (error) {
            res.status(500).json({message: "failed to get"})
        }
    }
}