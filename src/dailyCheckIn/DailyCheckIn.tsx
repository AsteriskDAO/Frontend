import { storeDataOnIPFS } from "@/shared/fleek";
import { DailyCheckIn, Profile } from "@/shared/types";
import Form from "./Form";
import { useState } from "react";
import { router } from "@/main";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  createIdentity,
  createProof,
  readContractData,
} from "@/shared/helpers";

export default () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleLogOut } = useDynamicContext();

  const handleProof = async (signature: any, dataStorageUUID: string) => {
    console.log("signature", signature);
    let identity;
    try {
      identity = await createIdentity(signature);
    } catch (e) {
      console.log("Error joining Asterisk", e);
      return;
    }

    console.log("identity", identity);

    const { identityCommitments } = await readContractData();

    console.log("identityCommitments", identityCommitments);

    if (!identityCommitments) return;

    console.log("dataStorageUUID", dataStorageUUID);

    await createProof(identityCommitments, identity, dataStorageUUID);
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    console.log("data", data);
    const localStorageProfile = window.localStorage.getItem("userProfile");

    const profile: Profile | null = localStorageProfile
      ? JSON.parse(localStorageProfile)
      : null;

    if (!profile || !data) return;

    const dailyCheckIn: DailyCheckIn = {
      profile,
      ...data,
    };

    console.log(dailyCheckIn);

    const fileName = await storeDataOnIPFS(dailyCheckIn);
    console.log("fileName", fileName);

    const signature = localStorage.getItem("userSignature") || "";
    await handleProof(signature, fileName);

    handleLogOut();
    router.navigate("/thank-you");
  };

  return (
    <>
      <div className="main-container">
        {isSubmitting ? (
          <div className="py-[140px]">
            <div>Wait while we are submitting your daily check-in</div>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <Form onSubmit={(data) => handleSubmit(data)} />
        )}
      </div>
    </>
  );
};
