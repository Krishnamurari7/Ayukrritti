import crypto from "crypto";

/**
 * Simple encryption utilities for sensitive data storage
 * Note: This is basic encryption. For production, consider using a dedicated secrets management service
 */

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-32-character-secret-key!!"; // Should be 32 characters
const ALGORITHM = "aes-256-cbc";

/**
 * Encrypts a string value
 */
export function encrypt(text: string): string {
  if (!text) return "";
  
  try {
    const key = crypto.scryptSync(ENCRYPTION_KEY, "salt", 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    
    // Return IV + encrypted data
    return iv.toString("hex") + ":" + encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
}

/**
 * Decrypts a string value
 */
export function decrypt(encryptedText: string): string {
  if (!encryptedText) return "";
  
  try {
    const key = crypto.scryptSync(ENCRYPTION_KEY, "salt", 32);
    const [ivHex, encrypted] = encryptedText.split(":");
    
    if (!ivHex || !encrypted) {
      throw new Error("Invalid encrypted format");
    }
    
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    // Return as-is if decryption fails (for backward compatibility)
    return encryptedText;
  }
}

/**
 * Checks if a string is encrypted (contains IV separator)
 */
export function isEncrypted(text: string): boolean {
  return text.includes(":") && text.split(":").length === 2;
}
