import { create } from 'ipfs-http-client';

// Create an IPFS client instance that points to your local node.
// No authentication is required for a locally running node.
const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
});

export default ipfs;

// import { create } from 'ipfs-http-client';
// import dotenv from 'dotenv';

// dotenv.config();

// const projectId = process.env.INFURA_PROJECT_ID;
// const projectSecret = process.env.INFURA_PROJECT_SECRET;

// if (!projectId || !projectSecret) {
//   throw new Error("Please set INFURA_PROJECT_ID and INFURA_PROJECT_SECRET in your environment");
// }

// // Create a basic auth string
// const auth =
//   'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// // Instantiate the IPFS client
// const ipfs = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth,
//   },
// });

// export default ipfs;
