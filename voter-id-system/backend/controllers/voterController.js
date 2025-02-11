// backend/controllers/voterController.js
import { web3, contract } from '../config/web3.js';
import ipfs from '../config/ipfs.js';
import Voter from '../models/Voter.js';
import QRCode from 'qrcode';
import createHttpError from 'http-errors';

export const registerVoter = async (req, res, next) => {
  try {
    console.log("Text fields received:", req.body);
    console.log("Files received:", req.files);

    const { name, aadhar } = req.body;
    if (!name || !aadhar) {
      throw createHttpError(400, "Missing required fields: name and/or aadhar");
    }
    
    const ipfsPayload = {
      ...req.body,
      aadharFileName: req.files?.aadharFile ? req.files.aadharFile[0].originalname : undefined,
      addressProofFileName: req.files?.addressProofFile ? req.files.addressProofFile[0].originalname : undefined
    };

    // 1. Add data to IPFS
    const ipfsResult = await ipfs.add(JSON.stringify(ipfsPayload));
    console.log("IPFS result:", ipfsResult);

    // 2. Store in blockchain using default account
    const fromAddress = web3.eth.defaultAccount;
    if (!fromAddress) {
      throw new Error("Default account is not set. Check your PRIVATE_KEY and web3 configuration.");
    }
    console.log("Using default account:", fromAddress);

    const tx = await contract.methods
      .addVoter(name, aadhar, ipfsResult.path)
      .send({ from: fromAddress });
    console.log("Transaction result:", tx);

    if (!tx.events || !tx.events.VoterAdded) {
      throw createHttpError(500, "VoterAdded event not found in transaction result");
    }
    const voterId = tx.events.VoterAdded.returnValues.voterId;

    // 3. Generate QR Code, converting BigInt voterId to string for JSON serialization
    const qrData = { 
      voterId: voterId.toString(), 
      ipfsHash: ipfsResult.path 
    };
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

    // 4. Save to MongoDB
    const voter = new Voter({
      ...req.body,
      ipfsHash: ipfsResult.path,
      voterId: voterId.toString() // Save as string if desired
    });
    await voter.save();

    res.status(201).json({
      qrCode,
      voterId: voterId.toString(),
      ipfsHash: ipfsResult.path
    });
    
  } catch (err) {
    console.error("Error in registerVoter:", err);
    next(err);
  }
};

export const verifyVoter = async (req, res, next) => {
  try {
    const voter = await Voter.findOne({ voterId: req.params.id });
    if (!voter) return next(createHttpError(404, 'Voter not found'));
    
    const isValid = await contract.methods
      .verifyVoter(voter.voterId)
      .call();

    res.json({ valid: isValid, voter });
  } catch (err) {
    console.error("Error in verifyVoter:", err);
    next(err);
  }
};


