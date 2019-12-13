var user = require("../../api/users/user.model");
var designation = require("../../api/designation/designation.model");

async function func() {
  const number = await user.countDocuments();
  if (number < 1) {
    const des = await designation.findOne({ name: "Admin" });
  
    if(des){
      const des_id = await des._id;
      const obj = {
        name: "CEO",
        email: "admin@gmail.com",
        designation_id: des_id,
        gender: "Female"
      };
      const e = new user(obj);
      e.save();
    }else{
      func()
    }
  }
}
func();
module.exports = func;
