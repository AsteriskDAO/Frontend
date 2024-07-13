import { storeDataOnIPFS } from "@/shared/fleek";
import { DailyCheckIn, Profile } from "@/shared/types";
import Form from "./Form";

export default () => {
  const handleSubmit = async (data: any) => {
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
  };

  return (
    <>
      <div className="main-container">
        <Form onSubmit={(data) => handleSubmit(data)} />
      </div>
    </>
  );
};
