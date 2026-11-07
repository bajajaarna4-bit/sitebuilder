const test = require('node:test');
const assert = require('node:assert');
const crypto = require('crypto');

// Direct implementation test for AES-256-GCM envelope encryption
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const MASTER_KEY = Buffer.from('a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0', 'hex');

function encrypt(plainText) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, MASTER_KEY, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return { encrypted, iv: iv.toString('hex'), tag };
}

function decrypt(data) {
  const decipher = crypto.createDecipheriv(ALGORITHM, MASTER_KEY, Buffer.from(data.iv, 'hex'));
  decipher.setAuthTag(Buffer.from(data.tag, 'hex'));
  let decrypted = decipher.update(data.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

test('AES-256-GCM BYOK Secret Encryption & Decryption', async (t) => {
  await t.test('correctly encrypts and decrypts user API keys', () => {
    const originalSecret = 'AIzaSyFakeSecretKeyForGoogleGeminiModel12345';
    const encryptedData = encrypt(originalSecret);

    assert.notStrictEqual(encryptedData.encrypted, originalSecret);
    assert.strictEqual(encryptedData.iv.length, 32); // 16 bytes in hex
    assert.strictEqual(encryptedData.tag.length, 32); // 16 bytes in hex

    const decrypted = decrypt(encryptedData);
    assert.strictEqual(decrypted, originalSecret);
  });

  await t.test('detects tampered ciphertext and throws authentication error', () => {
    const encryptedData = encrypt('sensitive_token');
    // Tamper with ciphertext
    const tampered = {
      ...encryptedData,
      encrypted: 'ff' + encryptedData.encrypted.slice(2),
    };

    assert.throws(() => {
      decrypt(tampered);
    }, /Unsupported state or unable to authenticate data/);
  });
});

