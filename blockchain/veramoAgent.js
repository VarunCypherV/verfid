// veramoAgent.js

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Generate RSA key pair for signing and verifying credentials (GigCo's key pair)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

// Export the public key so employers can use it for verification
const publicKeyPem = publicKey.export({ type: 'pkcs1', format: 'pem' });

// In-memory storage for credentials and revoked credentials
let storedCredentials = [];
let revokedCredentials = new Set(); // Store revoked credential IDs

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
            id: 'did:mock:gigco',
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
 * Revoke a credential by its ID
 * @param {string} credentialId - The ID of the credential to revoke
 */
function revokeCredential(credentialId) {
    // Check if the credential ID exists in the stored credentials
    console.log(storedCredentials);
    const exists = storedCredentials.some(cred => {
        const decoded = jwt.decode(cred);
        return decoded && decoded.credentialSubject && decoded.credentialSubject.id === credentialId;
    });

    if (exists) {
        revokedCredentials.add(credentialId);
        return true;
    }
    console.log(revokeCredentials)
    return false;
}

/**
 * Verify a single verifiable credential using GigCo's public key
 * @param {string} signedCredential - The signed verifiable credential (JWT)
 */
function verifyMockCredential(signedCredential) {
    try {
        const decodedCredential = jwt.verify(signedCredential, publicKeyPem, { algorithms: ['RS256'] });

        // Check if the credential has been revoked
        const credentialId = decodedCredential.credentialSubject.id;
        if (revokedCredentials.has(credentialId)) {
            return { valid: false, error: 'Credential has been revoked' };
        }

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
    revokeCredential, // Export this function for revocation
    verifyMockCredential,
    verifyAllCredentials,
    publicKeyPem,
};
