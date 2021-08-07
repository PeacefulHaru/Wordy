// Commented on Aug 8, 2021
// This type is valid

export type AvailableCookies = 'WordyAnonymousAccesstoken' | 'WordyAccesstoken' | 'WordyRefreshtoken' | 'wordyRefreshToken' | 'wordyAccessToken' | 'login' | 'darkLightModeCookie' 
export type FederalProvider = 'anonymous' | 'google';
export type Gateway = "iamGateway" | "wcsGateway" | "kmsGateway" | "mongoGateway" | "cloudTrailGateway" | "wesGateway";
export type EncrpytionMethod = "NotEncrypted" | "AES-256-GCM";
export type AvailableCmkWrn = 'wrn::kms:master:env:1:210804'; // version 1 key created on Aug 4