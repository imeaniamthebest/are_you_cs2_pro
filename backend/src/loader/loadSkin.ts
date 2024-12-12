import { readFileSync } from "node:fs";
import type { SkinProfile } from "../schemas";
import { isSkinProfile } from "../validators/is-skin-profile";
import { skinListPath, skinNotGroupedPath } from "../paths";

/**
 * 스킨 데이터를 불러옵니다.
 */
export const loadSkin = (): SkinProfile[] => {
	// skins.json과 skins_not_grouped.json을 불러와 병합함
	const data = [
		readFileSync(skinNotGroupedPath).toString(),
		readFileSync(skinListPath).toString(),
	]
		.map((text) => JSON.parse(text))
		.reduce((returnValue: SkinProfile[], currentValue: SkinProfile[]) => {
			return returnValue.concat(currentValue);
		}, [] as SkinProfile[]);

	if (!Array.isArray(data)) throw new Error("해석 결과가 배열이 아닙니다");

	// 유효하지 않은 프로필은 모두 소거하기
	const processed = data.filter(isSkinProfile);

	return processed;
};
