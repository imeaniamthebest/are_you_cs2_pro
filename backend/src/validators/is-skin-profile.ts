import { SkinProfileSchema, type SkinProfile } from "../schemas/skin-profile";

export const isSkinProfile = (profile: unknown): profile is SkinProfile =>
	SkinProfileSchema.safeParse(profile).success;
