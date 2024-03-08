const db = require("./../database/project.config");

login = async (username) =>
  await db
    .select(
      "u.user_id",
      "u.username",
      "u.password",
      "u.role_id",
      "u.foto_profil",
      "ur.role_name",
      "ur.role_description"
    )
    .from("users as u")
    .join("user_role as ur", "ur.role_id", "u.role_id")
    .where("u.username", username);

module.exports = {
  login,
};
