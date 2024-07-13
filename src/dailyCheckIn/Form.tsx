import { MENSTRUAL_CYCLE } from "@/shared/consts";
import React, { useState } from "react";

type SymptomsOrSideEffects = {
  present: boolean;
  severity: number;
  description: string;
};

type FormState = {
  howAreYouFeeling: number;
  symptoms: SymptomsOrSideEffects;
  sideEffects: SymptomsOrSideEffects;
  doctorAppointmentToday: boolean;
  menstrualCycle: string;
};

const initialFormState: FormState = {
  howAreYouFeeling: 0,
  symptoms: {
    present: false,
    severity: 1,
    description: "",
  },
  sideEffects: {
    present: false,
    severity: 1,
    description: "",
  },
  doctorAppointmentToday: false,
  menstrualCycle: "",
};

const HealthForm: React.FC<{ onSubmit: (data: any) => void }> = ({
  onSubmit,
}) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const [key, subKey] = name.split(".");

    delete errors[key];

    if (subKey) {
      setFormState((prevState) => {
        const nestedState = prevState[key as keyof FormState];
        if (typeof nestedState === "object" && nestedState !== null) {
          return {
            ...prevState,
            [key]: {
              ...nestedState,
              [subKey]:
                type === "checkbox"
                  ? (e.target as HTMLInputElement).checked
                  : value,
            },
          };
        }
        return prevState;
      });
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (formState.howAreYouFeeling === 0) {
      newErrors.howAreYouFeeling = "This field is required.";
    }

    if (formState.symptoms.present && !formState.symptoms.severity) {
      newErrors.symptomsSeverity =
        "Severity is required if symptoms are present.";
    }

    if (formState.sideEffects.present && !formState.sideEffects.severity) {
      newErrors.sideEffectsSeverity =
        "Severity is required if side effects are present.";
    }

    if (!formState.menstrualCycle) {
      newErrors.menstrualCycle = "This field is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formState);
      onSubmit(formState);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <label className="form-control w-full mb-4 max-w-md">
        <div className="label">
          <span className="label-text text-base">How Are You Feeling?</span>
        </div>
        <input
          type="range"
          name="howAreYouFeeling"
          min={0}
          max="100"
          value={formState.howAreYouFeeling}
          onChange={handleChange}
          className="range"
          step="25"
        />
        {errors.howAreYouFeeling && (
          <span className="text-red-500">{errors.howAreYouFeeling}</span>
        )}
        <div className="flex w-full justify-between px-2 text-xs">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </label>

      <label className="form-control w-full mb-4 max-w-md">
        <div className="label">
          <span className="label-text text-base">Are you having symptoms?</span>
        </div>
        <input
          type="checkbox"
          name="symptoms.present"
          checked={formState.symptoms.present}
          onChange={handleChange}
          className="toggle"
        />
        {formState.symptoms.present && (
          <div className="ml-6">
            <label className="form-control w-full mb-4 max-w-md">
              <div className="label">
                <span className="label-text text-base">
                  How severe are they?
                </span>
              </div>
              <select
                name="symptoms.severity"
                value={formState.symptoms.severity}
                onChange={handleChange}
                className="select select-bordered"
              >
                <option value={1}>Mild</option>
                <option value={2}>Moderate</option>
                <option value={3}>Severe</option>
                <option value={4}>Very Severe</option>
                <option value={5}>Extremely Severe</option>
              </select>
              {errors.symptomsSeverity && (
                <span className="text-red-500">{errors.symptomsSeverity}</span>
              )}
            </label>
            <label className="form-control w-full mb-4 max-w-md">
              <div className="label">
                <span className="label-text text-base">
                  What are you experiencing, today?
                </span>
              </div>
              <textarea
                name="symptoms.description"
                value={formState.symptoms.description}
                onChange={handleChange}
                className="textarea textarea-bordered"
              ></textarea>
            </label>
          </div>
        )}
      </label>

      <label className="form-control w-full mb-4 max-w-md">
        <div className="label">
          <span className="label-text text-base">
            Are you having any side effects from your medications?
          </span>
        </div>
        <input
          type="checkbox"
          name="sideEffects.present"
          checked={formState.sideEffects.present}
          onChange={handleChange}
          className="toggle"
        />
        {formState.sideEffects.present && (
          <div className="ml-6">
            <label className="form-control w-full mb-4 max-w-md">
              <div className="label">
                <span className="label-text text-base">
                  How severe are they?
                </span>
              </div>
              <select
                name="sideEffects.severity"
                value={formState.sideEffects.severity}
                onChange={handleChange}
                className="select select-bordered"
              >
                <option value={1}>Mild</option>
                <option value={2}>Moderate</option>
                <option value={3}>Severe</option>
                <option value={4}>Very Severe</option>
                <option value={5}>Extremely Severe</option>
              </select>
              {errors.sideEffectsSeverity && (
                <span className="text-red-500">
                  {errors.sideEffectsSeverity}
                </span>
              )}
            </label>
            <label className="form-control w-full mb-4 max-w-md">
              <div className="label">
                <span className="label-text text-base">
                  Please share what side effects you’re experiencing
                </span>
              </div>
              <textarea
                name="sideEffects.description"
                value={formState.sideEffects.description}
                onChange={handleChange}
                className="textarea textarea-bordered"
              ></textarea>
            </label>
          </div>
        )}
      </label>

      <label className="form-control w-full mb-4 max-w-md">
        <div className="label">
          <span className="label-text text-base">
            Where are you in your menstrual cycle?
          </span>
        </div>
        <select
          className="select select-bordered"
          name="menstrualCycle"
          value={formState.menstrualCycle}
          onChange={handleChange}
        >
          <option selected disabled value="">
            Pick one
          </option>
          {MENSTRUAL_CYCLE.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.menstrualCycle && (
          <span className="text-red-500">{errors.menstrualCycle}</span>
        )}
      </label>

      <div className="form-control w-full mb-4 max-w-md">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default HealthForm;
