import type { SkinProfile } from "../schemas";
import { isSkinCategory } from "../validators";
import { getSkinCategory } from "./get-skin-category";

/**
 * 스킨 리스트에서 특정 분류를 대상으로 필터링합니다.
 *
 * @param skinList 스킨 리스트 (필터 적용 대상)
 * @param categoryName 스킨 분류 이름 (필터 기준)
 * @returns
 */
export const filterByCategory = (
	skinList: SkinProfile[],
	categoryName: string,
) => {
	if (!isSkinCategory(categoryName))
		return new Error(`"${categoryName}"은(는) 존재하지 않는 카테고리입니다.`);

	return skinList.filter((skin) => getSkinCategory(skin) === categoryName);
};
