// veramoAgent.js

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Generate RSA key pair for signing and verifying credentials (GigCo's key pair)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Export the public key so employers can use it for verification
const publicKeyPem = publicKey.export({ type: 'pkcs1', format: 'pem' });

// In-memory storage for credentials
let storedCredentials = [];

/**
 * Create a Mock DID (Decentralized Identifier) for the worker
 */
function createMockDID() {
  return `did:mock:${crypto.randomUUID()}`;
}

/**
 * Issue a verifiable credential for a worker
 * @param {string} workerDid - The DID of the worker receiving the credential
 * @param {object} jobDetails - Details of the job (jobTitle, completionDate, description)
 */
function issueMockCredential(workerDid, jobDetails) {
  const credential = {
    "@context": "https://www.w3.org/2018/credentials/v1",
    type: "VerifiableCredential",
    issuer: {
      id: 'did:mock:gigco', // GigCo's DID
      name: 'GigCo'
    },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: workerDid,
      jobTitle: jobDetails.jobTitle,
      completionDate: jobDetails.completionDate,
      description: jobDetails.description
    }
  };

  // Sign the credential using GigCo's private key (RS256)
  const signedCredential = jwt.sign(credential, privateKey, { algorithm: 'RS256' });
  return signedCredential;
}

/**
 * Store a verifiable credential in memory (for demo purposes)
 * @param {string} credential - The signed verifiable credential (JWT)
 */
function storeCredential(credential) {
  storedCredentials.push(credential);
  return credential;
}

/**
 * Get all stored credentials (for demo purposes)
 */
function getStoredCredentials() {
  return storedCredentials;
}

/**
 * Verify a single verifiable credential using GigCo's public key
 * @param {string} signedCredential - The signed verifiable credential (JWT)
 */
function verifyMockCredential(signedCredential) {
  try {
    // Verify using the public key (RS256)
    const decodedCredential = jwt.verify(signedCredential, publicKeyPem, { algorithms: ['RS256'] });
    return { valid: true, decodedCredential };
  } catch (error) {
    return { valid: false, error: 'Invalid credential' };
  }
}

/**
 * Verify all received credentials (worker sends multiple)
 * @param {Array<string>} credentials - An array of signed credentials (JWTs)
 */
function verifyAllCredentials(credentials) {
  return credentials.map(credential => verifyMockCredential(credential));
}

module.exports = {
  createMockDID,
  issueMockCredential,
  storeCredential,
  getStoredCredentials,
  verifyMockCredential,
  verifyAllCredentials,
  publicKeyPem,
};
