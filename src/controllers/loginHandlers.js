const checkCredentials = (req, res) => {
  const { email, password } = req.body;

  if (email === "dwight@theoffice.com" && password === "123456") {
    res.status(200).send("Access Granted");
  } else {
    res.status(401).send("Access Denied");
  }
}

module.exports = {
  checkCredentials,
}