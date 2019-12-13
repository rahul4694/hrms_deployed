const KraSheetModel = require("../krasheetmodel");
const viewKramanagerUser = async (req, res) => {
  try {
    const kra = await KraSheetModel.findOne(
      { "kraSheet._id": req.params.id },
      { "kraSheet.$": 1 }
    );
    if (!kra) {
      return res.status(400).send("No Kra found");
    }

    const cleanValue = kra.kraSheet[0].kraAttributes.map(elements => {
      return elements;
    });
    const finalResponse = {
      cleanValue,
      _id: kra.kraSheet[0]._id
    };
    res.json(finalResponse);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
};
module.exports = { viewKramanagerUser };
