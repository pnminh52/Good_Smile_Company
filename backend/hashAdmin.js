import bcrypt from "bcrypt";

async function hashPassword() {
  const plainPassword = "1";
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed password:", hash);
}

hashPassword();
