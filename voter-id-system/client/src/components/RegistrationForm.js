import React, { useState } from 'react';
import { useWeb3 } from '../utils/web3';
import api from '../services/api';
import { QRCodeSVG } from 'qrcode.react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    dob: '',
    fatherName: '',
    motherName: '',
    permanentAddress: '',
    presentAddress: '',
    phone: '',
    email: '',
    aadharFile: null,
    addressProofFile: null,
  });
  
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { connectWallet, account } = useWeb3();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    if (!account) {
      alert("Please connect your wallet first");
      return false;
    }

    if (calculateAge(formData.dob) < 18) {
      alert("You must be at least 18 years old to register");
      return false;
    }

    if (!/^\d{12}$/.test(formData.aadhar)) {
      alert("Aadhar number must be 12 digits");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be 10 digits");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (!formData.aadharFile) {
      alert("Please upload Aadhar document");
      return false;
    }

    if (!formData.addressProofFile) {
      alert("Please upload address proof");
      return false;
    }

    if (!validFileTypes.includes(formData.aadharFile.type)) {
      alert("Aadhar file must be JPG, PNG, or PDF");
      return false;
    }

    if (!validFileTypes.includes(formData.addressProofFile.type)) {
      alert("Address proof must be JPG, PNG, or PDF");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value !== 'object') formPayload.append(key, value);
      });

      // Append files
      formPayload.append('aadharFile', formData.aadharFile);
      formPayload.append('addressProofFile', formData.addressProofFile);
      formPayload.append('walletAddress', account);

      const response = await api.post('/api/voter/register', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setQrData(response.data);
        // Reset form
        setFormData({
          name: '',
          aadhar: '',
          dob: '',
          fatherName: '',
          motherName: '',
          permanentAddress: '',
          presentAddress: '',
          phone: '',
          email: '',
          aadharFile: null,
          addressProofFile: null,
        });
        alert("Registration successful!");
      }
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.message || 
        error.message || 
        'Registration failed. Please try again.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="wallet-section">
        <button 
          onClick={connectWallet} 
          className={`connect-wallet-btn ${account ? 'connected' : ''}`}
        >
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Voter Registration Form</h2>

        <div className="form-grid">
          {/* Personal Information */}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Aadhar Number *</label>
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleInputChange}
              maxLength="12"
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Parents' Information */}
          <div className="form-group">
            <label>Father's Name *</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mother's Name *</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Address Information */}
          <div className="form-group full-width">
            <label>Permanent Address *</label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Present Address *</label>
            <textarea
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Contact Information */}
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength="10"
              required
            />
          </div>

          <div className="form-group">
            <label>Email ID *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* File Uploads */}
          <div className="form-group full-width">
            <label>Aadhar Document (PDF/Image) *</label>
            <input
              type="file"
              name="aadharFile"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Address Proof (PDF/Image) *</label>
            <input
              type="file"
              name="addressProofFile"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>

      {qrData && (
        <div className="voter-card">
          <h3>Your Blockchain Voter ID</h3>
          <div className="qrcode-container">
            <QRCodeSVG 
              value={JSON.stringify(qrData)} 
              size={256}
              includeMargin={true}
            />
          </div>
          <div className="voter-info">
            <p><strong>Voter ID:</strong> {qrData.voterId}</p>
            <p><strong>IPFS Hash:</strong> {qrData.ipfsHash}</p>
            <p><strong>Blockchain Address:</strong> {qrData.contractAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
}