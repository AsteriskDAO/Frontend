import {
  DIAGNOSIS_SOURCE,
  DISORDER_SUBTYPE,
  MEDICATIONS,
  TREATMENT,
} from "@/shared/consts";
import { Profile } from "@/shared/types";
import { useState } from "react";
import shortUUID from "short-uuid";
import { useAccount } from "wagmi";

export default () => {
  const { isConnected } = useAccount();
  const localStorageProfile = window.localStorage.getItem("userProfile");

  const userProfile: Profile | null = localStorageProfile
    ? JSON.parse(localStorageProfile)
    : null;

  const [diagnosisType, setDiagnosisType] = useState(
    userProfile ? userProfile.diagnosisType : ""
  );
  const [diagnosisSource, setDiagnosisSource] = useState(
    userProfile ? userProfile.diagnosisSource : ""
  );
  const [medication, setMedication] = useState(
    userProfile ? userProfile.medication : ""
  );
  const [treatment, setTreatment] = useState(
    userProfile ? userProfile.treatment : ""
  );
  const [disorderSubtype, setDisorderSubtype] = useState(
    userProfile ? userProfile.disorderSubtype : ""
  );
  const [focusGroup, setFocusGroup] = useState(
    userProfile ? userProfile.focusGroup : false
  );
  const [firstSymptomsAge, setFirstSymptomsAge] = useState<number>(
    userProfile ? userProfile.firstSymptomsAge : 0
  );

  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const short = shortUUID();
    console.log(short.generate());

    console.log(
      `diagnosisType: ${diagnosisType}; diagnosisSource: ${diagnosisSource}; medication: ${medication}; treatment: ${treatment}; disorderSubtype: ${disorderSubtype}; focusGroup: ${focusGroup}; firstSymptomsAge: ${firstSymptomsAge}`
    );
    if (
      !diagnosisType ||
      !diagnosisSource ||
      !disorderSubtype ||
      !firstSymptomsAge
    ) {
      setError(true);
      return;
    }

    const profile: Profile = {
      diagnosisType,
      diagnosisSource,
      medication,
      treatment,
      disorderSubtype,
      focusGroup,
      firstSymptomsAge,
    };

    console.log("userProfile", JSON.stringify(profile));

    window.localStorage.setItem("userProfile", JSON.stringify(profile));
  };

  return (
    <div className="pb-8">
      <div>
        <label className="form-control w-full mb-4 max-w-md">
          <div className="label">
            <span className="label-text text-base">
              Were you Self Diagnosed or Professionally Diagnosed?
            </span>
          </div>
          <select
            className="select select-bordered"
            value={diagnosisType}
            onChange={(e) => setDiagnosisType(e.target.value)}
          >
            <option value="" disabled selected>
              Pick one
            </option>
            <option value="self">Self Diagnosed</option>
            <option value="professional">Professionally Diagnosed</option>
          </select>
        </label>

        <label className="form-control w-full mb-4 max-w-md">
          <div className="label">
            <span className="label-text text-base">
              How did you arrive at your diagnosis?
            </span>
          </div>
          <select
            className="select select-bordered"
            value={diagnosisSource}
            onChange={(e) => setDiagnosisSource(e.target.value)}
          >
            <option value="" disabled selected>
              Pick one
            </option>
            {DIAGNOSIS_SOURCE.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="form-control w-full mb-4 max-w-md">
          <div className="label flex flex-col items-start">
            <span className="label-text text-base">
              What medications are you on (if any)?
            </span>
            <span className="label-text-alt">
              Please include contraception.
            </span>
          </div>
          <select
            className="select select-bordered"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          >
            <option selected>Pick one</option>
            {MEDICATIONS.map((medication) => (
              <option key={medication}>{medication}</option>
            ))}
          </select>
        </label>

        <label className="form-control w-full mb-4 max-w-md">
          <div className="label">
            <span className="label-text text-base">Treatment (if any)</span>
          </div>
          <select
            className="select select-bordered"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          >
            <option selected>Pick one</option>
            {TREATMENT.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="form-control w-full mb-4 max-w-md">
          <div className="label">
            <span className="label-text text-base">
              Which Disorder Subtype are you experiencing?
            </span>
          </div>
          <select
            className="select select-bordered"
            value={disorderSubtype}
            onChange={(e) => setDisorderSubtype(e.target.value)}
          >
            <option selected>Pick one</option>
            {DISORDER_SUBTYPE.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="form-control w-full mb-4 max-w-md">
          <div className="label">
            <span className="label-text text-base">
              How old were you when you experienced your first symptom?
            </span>
          </div>
          <input
            value={firstSymptomsAge}
            onChange={(e) => setFirstSymptomsAge(parseInt(e.target.value))}
            type="number"
            min={1}
            max={99}
            className="input input-bordered w-full max-w-md"
          />
        </label>

        <div className="w-full max-w-md mb-6">
          <label className="label cursor-pointer justify-start">
            <span className="label-text text-base mr-6">
              Focus group participation
            </span>
            <input
              type="checkbox"
              className="toggle"
              checked={focusGroup}
              onChange={(e) => setFocusGroup(e.target.checked)}
            />
          </label>
          <p className="label-text-alt ml-1">
            In the future, we will offer researchers the ability to request
            participants for focus groups. You will be compensated for your
            involvement. Please select below if you would like the invitations.
          </p>
        </div>

        {error && (
          <div className="text-error mb-4">Please Fill all required fields</div>
        )}
      </div>
      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
