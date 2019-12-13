const Notification = require("./notification.model");
const getNotification = async (req, res) => {
  try {
    const notification = await Notification.find({ to: req._id })
      .populate("to from", "name -_id")
      .populate("typeId", "-_id -__v")
      .select("-__v")
      .sort({ date: -1 })
      .skip(Number(req.skip))
      .limit(8);

    if (!notification) {
      return res.status(400).send("No notification found");
    }
    res.send(notification);
  } catch (error) {
    console.log(error.message);

    res.status(500).send("server error");
  }
}

const postNotification=async (req,res)=>{
 
  
  try {
    let notification=await Notification.findByIdAndUpdate(req.params.id,{read:true},{new:true})
    if(!notification){
      return res.status(400).json("No notifiaction found")}
     notification= await Notification.find({ to: req._id })
      .populate("to from", "name -_id")
      .populate("typeId", "-_id -__v")
      .select("-__v")
      .sort({ date: -1 })
      .skip(Number(req.skip))
      .limit(8);

      const length=await Notification.find({to:req._id , read:false}).countDocuments()
      console.log(length);
      
    res.send({notification, NotificationNumber:length})
  } catch (error) {
    console.log(error.message);

    res.status(500).send("server error");
  }
  
}
module.exports = { getNotification ,postNotification};
