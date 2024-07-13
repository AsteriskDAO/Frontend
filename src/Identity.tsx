import { Identity } from "@semaphore-protocol/identity";
import { useEffect } from "react";
import { Group } from "@semaphore-protocol/group";
import { generateProof, verifyProof } from "@semaphore-protocol/proof";

export default () => {
  const { privateKey, commitment } = new Identity();

  useEffect(() => {
    setTimeout(() => {
      semaphore();
    }, 5000);
  }, []);

  const semaphore = async () => {
    const identity1 = new Identity(privateKey);

    const message = "Hello World";

    const signature = identity1.signMessage(message);

    console.log("signature", signature);

    // Static method.
    const valid = Identity.verifySignature(
      message,
      signature,
      identity1.publicKey
    );

    console.log("valid", valid);

    const group1 = new Group();

    group1.addMember(commitment);

    const scope = group1.root;

    const snarkArtifacts = {
      wasm: "https://config.clonk.me/asterisk.wasm",
      zkey: "https://config.clonk.me/asterisk.zkey",
    };

    let proof;
    try {
      proof = await generateProof(
        identity1,
        group1,
        message,
        scope,
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

  return (
    <div>
      <h1>Identity</h1>
    </div>
  );
};
