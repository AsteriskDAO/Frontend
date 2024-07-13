export interface Profile {
  diagnosisType: string;
  diagnosisSource: string;
  medication: string;
  treatment: string;
  disorderSubtype: string;
  focusGroup: boolean;
  firstSymptomsAge: number;
}

export interface DailyCheckIn {
  profile: Profile;
  howAreYouFeeling: number;
  symptoms: {
    present: boolean;
    severity: number;
    description: string;
  };
  sideEffects: {
    present: boolean;
    severity: number;
    description: string;
  };
  doctorAppointmentToday: boolean;
  menstrualCycle: string;
}
