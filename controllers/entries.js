const handleUpdateUserEntries = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .returning("entries")
    .increment("entries", 1)
    .where("id", "=", id)
    .then(result => {
      console.log("result", result);
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(400).json("Not executed");
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = {
  handleUpdateUserEntries
};
