const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("invalid form submission");
  }

  db.select("email", "hash")

    .from("login")
    .where("email", "=", email)
    .then(result => {
      // console.log("result", result[0]);
      if (result.length > 0) {
        const isValid = bcrypt.compareSync(password, result[0].hash);
        if (isValid) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then(users => {
              res.status(200).json(users[0]);
            })
            .catch(err => res.status(400).json(err));
        } else {
          res.status(400).json("Wrong password");
        }
      } else {
        res.status(404).json("User doesn't exist");
      }
    });
};

module.exports = {
  handleSignin
};
