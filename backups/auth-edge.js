const encoder = new TextEncoder();
const secretKey = process.env.OWNER_SESSION_SECRET || "muneem_timber_store_owner_secret_key_1995";

async function getCryptoKey() {
  const keyBuf = encoder.encode(secretKey);
  return await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signSession(username, expires) {
  const key = await getCryptoKey();
  const data = encoder.encode(`${username}:${expires}`);
  const signatureBuf = await crypto.subtle.sign("HMAC", key, data);
  const signature = bufToHex(signatureBuf);
  return `${username}:${expires}:${signature}`;
}

export async function verifySession(sessionString) {
  if (!sessionString) return false;
  const parts = sessionString.split(":");
  if (parts.length !== 3) return false;
  const [username, expires, signature] = parts;
  
  if (Date.now() > parseInt(expires)) {
    return false; // expired
  }
  
  const expectedSession = await signSession(username, expires);
  return expectedSession === sessionString;
}
