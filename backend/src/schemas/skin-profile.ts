import { z } from "zod";

export const SkinProfileSchema = z.object({
	id: z.string(),
	skin_id: z.string(),
	name: z.string(),
	description: z.string(),
	weapon: z.object({ id: z.string(), name: z.string() }),
	category: z.object({ id: z.string(), name: z.string() }),
	pattern: z.object({ id: z.string(), name: z.string() }),
	min_float: z.number(),
	max_float: z.number(),
	wear: z.object({ id: z.string(), name: z.string() }),
	stattrak: z.boolean(),
	souvenir: z.boolean(),
	paint_index: z.string(),
	rarity: z.object({ id: z.string(), name: z.string(), color: z.string() }),
	market_hash_name: z.string(),
	team: z.object({ id: z.string(), name: z.string() }),
	style: z.object({ id: z.number(), name: z.string(), url: z.string() }),
	image: z.string(),
});

export type SkinProfile = z.infer<typeof SkinProfileSchema>;
