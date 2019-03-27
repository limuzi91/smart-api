const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("invalid form submission");
  }

  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    return trx
      .insert({
        hash,
        email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date()
          })
          .then(result => {
            res.status(200).json(result);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      })

      .catch(err => res.status(400).json(err)) //fix bug: Unhandled rejection error: duplicate key value violates unique constraint "login_email_key"
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

module.exports = {
  handleRegister
};
