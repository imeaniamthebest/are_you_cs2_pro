import { loadSkin } from "../loader/loadSkin";

/**
 * 스킨 배열에서 특정 ID를 가진 스킨을 찾아 반환합니다.
 *
 * @param id 탐색할 스킨 ID
 * @returns
 */
export const getSkinById = (id: string) => {
	return loadSkin().find((skin) => skin.id === id);
};
