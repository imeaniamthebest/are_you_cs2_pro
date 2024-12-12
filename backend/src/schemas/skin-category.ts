import { z } from "zod";

// 2024년 12월 기준으로 작성된 스키마입니다.
// CS2가 업데이트됨에 따라 가능성이 크지 않지만 변화될 수 있습니다.

export const SkinCategorySchema = z.enum([
	"권총",
	"소총",
	"중화기",
	"기관단총",
	"칼",
	"장갑",
]);

export type SkinCategory = z.infer<typeof SkinCategorySchema>;
