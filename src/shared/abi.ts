export const abi = [
  {
    inputs: [{ internalType: "address", name: "_semaphore", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "daysSinceDeployment",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deploymentTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchIdCommitments",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "groupId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "identityCommitments",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "identityCommitment", type: "uint256" },
    ],
    name: "join",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "semaphore",
    outputs: [
      { internalType: "contract ISemaphore", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "merkleTreeDepth", type: "uint256" },
      { internalType: "uint256", name: "merkleTreeRoot", type: "uint256" },
      { internalType: "uint256", name: "nullifier", type: "uint256" },
      { internalType: "uint256", name: "reportCid", type: "uint256" },
      { internalType: "uint256[8]", name: "points", type: "uint256[8]" },
    ],
    name: "submitReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
