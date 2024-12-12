import { type SkinCategory, SkinCategorySchema } from "../schemas";

export const isSkinCategory = (category: unknown): category is SkinCategory =>
	SkinCategorySchema.safeParse(category).success;
