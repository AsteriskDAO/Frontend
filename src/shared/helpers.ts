import { createPublicClient, http, Address } from "viem";
import { sepolia } from "viem/chains";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import { generateProof, verifyProof } from "@semaphore-protocol/proof";
import { abi } from "./abi";

import { simulateContract, writeContract } from "@wagmi/core";
import { config } from "../wagmi";
import { BigNumberish } from "ethers";

const client = createPublicClient({
  chain: sepolia,
  transport: http(
    `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`
  ),
});

export const readContractData = async () => {
  const address = import.meta.env.VITE_CONTRACT_ADDRESS;
  let daysSinceDeployment, identityCommitments;

  try {
    daysSinceDeployment = (await client.readContract({
      address,
      abi,
      functionName: "daysSinceDeployment",
    })) as number;

    identityCommitments = (await client.readContract({
      address,
      abi,
      functionName: "fetchIdCommitments",
    })) as bigint[];
  } catch (e) {
    console.log("Error reading contract data", e);
  }

  console.log({ daysSinceDeployment, identityCommitments });

  return { daysSinceDeployment, identityCommitments };
};

export const joinAsterisk = async (commitment: bigint) => {
  const address = import.meta.env.VITE_CONTRACT_ADDRESS;
  const { request } = await simulateContract(config, {
    abi,
    address: address as Address,
    functionName: "join",
    args: [commitment],
  });
  const hash = await writeContract(config, request);
  return hash;
};

export const createIdentity = async (signature: string) => {
  const identity = new Identity(signature);

  await joinAsterisk(identity.commitment);

  return identity;
};

export const createProof = async (
  commitments: bigint[],
  identity: Identity,
  message: BigNumberish | Uint8Array
) => {
  const group = new Group(commitments);
  const snarkArtifacts = {
    wasm: "https://config.clonk.me/asterisk.wasm",
    zkey: "https://config.clonk.me/asterisk.zkey",
  };

  let proof;
  try {
    proof = await generateProof(
      identity,
      group,
      message,
      group.root,
      10,
      snarkArtifacts
    );
    console.log("proof", proof);

    const verified = await verifyProof(proof); // true or false.

    console.log("verified", verified);
  } catch (e) {
    console.log("error", e);
  }
};
