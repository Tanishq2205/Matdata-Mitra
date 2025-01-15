# Voter ID System

This project is a Voter ID System that allows users to register as voters using a web application built with React for the frontend, an Express server for the backend, and smart contracts deployed on the blockchain.

## Project Structure

- **client/**: Contains the React frontend application.
  - **public/**: Public assets such as `index.html`.
  - **src/**: Source code for the React application.
    - **components/**: Contains React components.
      - `RegisterVoter.js`: Component for handling voter registration.
    - **contracts/**: Directory for ABI files related to smart contracts.
    - `App.js`: Main application component.
    - `index.js`: Entry point for the React application.
  - `package.json`: Lists frontend dependencies.

- **server/**: Contains the backend Express server.
  - **models/**: Mongoose schemas.
    - `Voter.js`: Schema for voter data.
  - **routes/**: Directory for API route definitions.
  - `index.js`: Entry point for the Express server.
  - `package.json`: Lists backend dependencies.

- **blockchain/**: Contains the Truffle project for smart contracts.
  - **contracts/**: Solidity smart contracts.
    - `VoterRegistration.sol`: Smart contract for voter registration.
  - **migrations/**: Deployment scripts for smart contracts.
  - **test/**: Test files for smart contracts.
  - `truffle-config.js`: Configuration for the Truffle framework.
  - **build/**: Compiled smart contracts.

- **.env**: Environment variables, such as MongoDB URI.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd voter-id-system
   ```

2. **Install frontend dependencies**:
   ```
   cd client
   npm install
   ```

3. **Install backend dependencies**:
   ```
   cd ../server
   npm install
   ```

4. **Set up the environment variables**:
   Create a `.env` file in the root directory and add your MongoDB URI.

5. **Run the backend server**:
   ```
   cd server
   node index.js
   ```

6. **Run the frontend application**:
   ```
   cd client
   npm start
   ```

## Usage

- Navigate to the frontend application in your browser to access the voter registration form.
- Follow the instructions to register as a voter.

## License

This project is licensed under the MIT License.