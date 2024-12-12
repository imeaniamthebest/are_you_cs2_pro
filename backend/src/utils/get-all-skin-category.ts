import { loadSkin } from "../loader/loadSkin";
import { getSkinCategory } from "./get-skin-category";

/**
 * 모든 카테고리 분류 추출하기
 * @returns
 */
export const getAllSkinCategory = () => {
	const skinList = loadSkin();
	return (
		skinList
			// 카테고리 정보 추출
			.map(getSkinCategory)
			// 중복 제거
			.filter(
				(category, index, categories) =>
					!categories.slice(0, index).includes(category),
			)
	);
};
