import { FleekSdk, ApplicationAccessTokenService } from "@fleek-platform/sdk";
import shortUUID from "short-uuid";
import { createJsonFile } from "./createJSON";

const applicationService = new ApplicationAccessTokenService({
  clientId: import.meta.env.VITE_FLEEK_CLIENT_ID,
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService,
});

export const storeDataOnIPFS = async (metadata: any): Promise<string> => {
  // Upload metadata to IPFS
  const name = shortUUID().generate();

  const data = {
    id: name,
    ...metadata,
  };

  const metadataFile = createJsonFile(data, name);

  const metadataResponse = await fleekSdk.storage().uploadFile({
    file: metadataFile,
  });

  console.log("metadataResponse", metadataResponse);

  return name;
};
