const KraSheetModel = require("../krasheetmodel");
const viewkramanager = async (req, res) => {
  try {
    // let kra=await KraSheetModel.find({"reportingManagerId":req._id,"kraSheet.Status":"Not Approved"},{"kraSheet.$":1}).select("-_id")
    let kra = await KraSheetModel.find(
      { reportingManagerId: req._id, "kraSheet.Status": "Not Approved" },
      { "kraSheet.$": 1 }
    ).select("-_id");

    let kra2 = await KraSheetModel.find({ reportingManagerId: req._id })
      .populate({
        path: "userId",
        model: "User",
        select: { designation_id: 1, department_id: 1, name: 1 },
        populate: {
          path: "designation_id department_id",
          select: "name"
        }
      })
      .select("-_id -kraSheet.kraAttributes -__v")
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    kra2=kra2.filter(e=>{
      
      
      if(e.kraSheet[0].date.getMonth()==month && e.kraSheet[0].date.getFullYear()==year ){
          e.kraSheet.splice(1)
          
          
          return true
      }
      else{
        return false
      }
  })

    if (!kra2) {
      return res.status(400).send("No Kra found");
    }

    res.json(kra2);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server");
  }
};
module.exports = { viewkramanager };
