import crypto from "crypto";
import bcrypt from "bcryptjs";

export function generateResetToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = bcrypt.hashSync(rawToken, 10);

  return {
    rawToken,     
    hashedToken,  
  };
}
export default generateResetToken;
