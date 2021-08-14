// Type
import { 
  AvailableCmkWrn, 
  EncryptionMethod, 
  EncryptedDek, Wrn, AvailableWpWrn,
  OkrObjectType
} from './availableType';

export type Resource = {
  // finder data
  resourceVersion: "1.0.210804";
  wrn: Wrn;
  ownerWrn?: Wrn; // resource owner.
  dateAdded: number;
  createdByWrn?: string; // the one who created this resource. can be human or wordy internal service 
  // Encrpytion
  encryptionMethod: EncryptionMethod; //if this undefined? not encrpted
  cmkWrn?: AvailableCmkWrn; // cmk data does not change.
  encryptedDek?: EncryptedDek;
  // Actual data
  ciphertextBlob?: any;
  notEncrpytedData?: any;
  // future feature
  isClientEncrpyted?: boolean; // client key encrypts the encryptedDek after 
};

export type ResourceId = {
  wrn: Wrn;
  ownerWrn: Wrn;
  dateAdded?: number;
  // Modifing data
  modifableUntil?: number; // unless specified, data can be modifed?
  // wordy policy checker 
  wpWrn?: AvailableWpWrn; // this will be checked first, even before
  // might add dateAdded;
  resoureAvailability?: "Visible" | "NotVisible";
  rejectedReason?: string;
};

// Pure resource contains all unencrypted human-readable resource 
// that was decrypted from ciphertextBlob
export type PureResource = ResourceId & (
  // OKR
  OkrLinkPure |
  MyOkrPure |
  OkrObjectPure |
  OkrComment |
  OkrContainerPure | 
  // USER & GROUP
  UserPure |
  GroupPure
);

export type UserPure = {
  federalProvider: 'google',
  federalId: string;
  lastName: string;
};
// =============
// OKR
// =============

export type OkrLinkPure = {
  targetOwnerWrn: Wrn
};

// Below is the OKR resources
export type MyOkrPure = {
  id: string; // federalProvider (go) + federalId (will be modified, later. it is only displaying)
  name: string; // dispalying name Jeongwoo Kim@jkim67cloud (but now, I will just use the same id)
  whichOneDownloadFirst: Wrn;
  quarterlyContainers: Wrn[];
  yearlyContainers: Wrn[],
  longtermContainers: Wrn[],
  finaldayContainer?: Wrn, // this is NOT WRN[]
  joinedGroup: Wrn[],
};

export type OkrContainerPure = {
  containerType: "quarterly" | "yearly" | "longterm" | "finalday";
  from: number;
  until: number;
  addableUntil: number;
  containingObject?: Wrn[];
  title?: string;
}

export type OkrObjectHeader = {
  type: OkrObjectType;
  title: string, // BFR cut til ## (2 hashtag calcualtes your result and put inside)
  isDataSatisfied?: "Satisfied" | "NotSatisfied"
};
export type OkrObjectPure = OkrObjectHeader & {
  // == MANDATORY DATA AFTER CREATION == //
  initialData?: number; // 0 tasks or 77kg of weight
  measuredType?: "Speed" | "NumberOfTaskDone"; // 
  speedPerWeek?: number; // if NumberOfTaskDone, (getting -0.7 off all the time)
  maxNumberOfTaskDone?: number;
  unitPerWeek?: string; // kg/week 
  // == comment == // 
  standard?: string; // write standard of the goal. one feature = 1.0pt, bug fix 0.2 pt, written by end user
  // body
  proof?: Wrn[]
  comment?: Wrn[]
  // tail
  finalScore?: number;
};

export type GroupPure = {
  leaderWrn: Wrn,
  members: Wrn[]
};

export type OkrComment = {
  comment: string,
  repliedComment?: Wrn; // if it belongs, the comment lives within the comment
  isRepliable: boolean;
  commentedOn: number // July 30, 2021
};

