const model = require("../../model/auth.model");
const { generateToken } = require("../../services/auth.service");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both nik and password." });
  }

  try {
    let users = await model.login(username);
    if (!users.length > 0) {
      return res.status(401).json({ message: "Account not found!" });
    }
    let user = users[0]; // Mengambil objek pertama dari array

    // Menggunakan bcrypt.compare untuk memverifikasi password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Generate a JWT token and send it in the response
    const payload = {
      user_id: user.user_id,
      username: user.username,
      foto_profil: user.foto_profil,
      role_id: user.role_id,
      role_name: user.role_name,
      role_description: user.description,
    };

    const token = generateToken(payload);
    res.json({ token, data: payload }); // Mengirimkan payload yang sudah dibuat, bukan user
  } catch {
    // Menambahkan parameter error di blok catch
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Error during login." });
  }
};

module.exports = {
  login,
};
