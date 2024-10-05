// app.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {
    createMockDID,
    issueMockCredential,
    storeCredential,
    getStoredCredentials,
    verifyAllCredentials,
    revokeCredential, // New function for revocation
    publicKeyPem,

} = require('./veramoAgent1');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

/**
 * Route to create a DID for a worker (e.g., Alice)
 * GET /create-did
 */
app.get('/create-did', (req, res) => {
    const did = createMockDID();
    res.json({ did });
});

/**
 * Route to issue a verifiable credential for a worker
 * POST /issue-credential
 * Expected body: { workerDid, jobDetails: { jobTitle, completionDate, description } }
 */
app.post('/issue-credential', (req, res) => {
    const { workerDid, jobDetails } = req.body;

    const credential = issueMockCredential(workerDid, jobDetails);
    res.json({ credential });
});

/**
 * Route to store a verifiable credential (for demo purposes)
 * POST /store-credential
 * Expected body: { credential }
 */
app.post('/store-credential', (req, res) => {
    const { credential } = req.body;
    const stored = storeCredential(credential);
    res.json({ stored });
});

/**
 * Route to retrieve all stored credentials
 * GET /get-credentials
 */
app.get('/get-credentials', (req, res) => {
    const credentials = getStoredCredentials();
    res.json({ credentials });
});

/**
 * Route to revoke a verifiable credential
 * POST /revoke-credential
 * Expected body: { credential }
 */
app.post('/revoke-credential', (req, res) => {
    const { credential } = req.body;

    // Decode the credential (without verifying signature) to get the credential ID
    const decoded = jwt.decode(credential);

    if (!decoded || !decoded.credentialSubject || !decoded.credentialSubject.id) {
        return res.status(400).json({ error: 'Invalid credential format' });
    }

    const credentialId = decoded.credentialSubject.id; // Extract the ID from the credential subject

    // Revoke the credential using the decoded ID
    const revoked = revokeCredential(credentialId);

    if (revoked) {
        res.json({ revoked: true, credentialId });
    } else {
        res.status(400).json({ error: 'Credential not found or already revoked' });
    }
});

/**
 * Route to verify multiple credentials (received from a worker)
 * POST /verify-all-credentials
 * Expected body: { credentials: [JWT1, JWT2, ...] }
 */
app.post('/verify-all-credentials', (req, res) => {
    const { credentials } = req.body;
    const verificationResults = verifyAllCredentials(credentials);
    res.json({ results: verificationResults });
});

/**
 * Route to fetch the public key for credential verification
 * GET /public-key
 */
app.get('/public-key', (req, res) => {
    res.send(publicKeyPem);
});

/**
 * New Route: Worker sends their credentials to a prospective employer for verification
 * POST /send-credentials
 * Expected body: { employerUrl, credentials: [JWT1, JWT2, ...] }
 */
app.post('/send-credentials', async (req, res) => {
    const { employerUrl, credentials } = req.body;

    try {
        const response = await axios.post(`${employerUrl}/verify-all-credentials`, { credentials });
        res.json({ employerVerificationResult: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error sending credentials to employer' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
