
interface IBankInfo {
  routing: number,
  account: number
}

export interface IOnboarding {
  onboardingId: number,
  license: string,
  hasBankInfo: boolean,
  hasSsnImage: boolean,
  hasHeadshotImage: boolean,
  hasFullBodyImage: boolean,
}
