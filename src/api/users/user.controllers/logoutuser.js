const logout = async (req, res, next) => {
  try {
    req.user.token = "";
    await req.user.save();
    res.send('LOGOUT');
  } catch (e) {
    console.log(e);
    return res.status(400).send();
  }
};

module.exports = { logout };
