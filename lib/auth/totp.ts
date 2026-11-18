/**
 * WebCrypto-based RFC 6238 TOTP verification and generation
 */

// Base32 decode
function base32Decode(base32: string): Uint8Array {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const clean = base32.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const output = [];

  for (let i = 0; i < clean.length; i++) {
    const idx = alphabet.indexOf(clean[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return new Uint8Array(output);
}

export function generateTotpSecret(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    result += alphabet[bytes[i] % 32];
  }
  return result;
}

export async function verifyTotpToken(
  secret: string,
  token: string,
  windowSteps: number = 1
): Promise<boolean> {
  const timeStep = 30; // seconds
  const currentStep = Math.floor(Date.now() / 1000 / timeStep);
  const keyBytes = base32Decode(secret);

  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes as unknown as BufferSource,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  for (let offset = -windowSteps; offset <= windowSteps; offset++) {
    const step = currentStep + offset;
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setUint32(4, step, false);

    const hmac = await crypto.subtle.sign("HMAC", key, buffer);
    const hmacArray = new Uint8Array(hmac);
    const offsetByte = hmacArray[hmacArray.length - 1] & 0xf;
    const binary =
      ((hmacArray[offsetByte] & 0x7f) << 24) |
      ((hmacArray[offsetByte + 1] & 0xff) << 16) |
      ((hmacArray[offsetByte + 2] & 0xff) << 8) |
      (hmacArray[offsetByte + 3] & 0xff);

    const otp = (binary % 1000000).toString().padStart(6, "0");
    if (otp === token.trim()) {
      return true;
    }
  }

  return false;
}
