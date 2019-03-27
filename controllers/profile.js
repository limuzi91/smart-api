const handleGetProfile = (req, res, db) => {
  const { userId } = req.params;
  db.select("*")
    .from("users")
    .where({
      id: userId
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = {
  handleGetProfile
};
