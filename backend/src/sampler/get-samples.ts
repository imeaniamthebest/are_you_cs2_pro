import { isString, range, sample } from "remeda";
import { loadSkin } from "../loader/loadSkin";
import type { SkinCategory, SkinProfile } from "../schemas";
import { filterByCategory } from "../utils";

/**
 * 스킨 목록에서 임의의 스킨 프로필들을 샘플링합니다.
 *
 * @param n - 샘플링할 스킨 프로필의 개수
 * @param category - (선택적) 샘플링할 스킨의 카테고리. 제공하지 않으면 전체 스킨 목록에서 샘플링합니다.
 * @returns 샘플링된 스킨 프로필 배열 또는 오류 객체
 *
 * @throws {Error} 요청된 샘플 수가 전체 데이터 수를 초과하거나 존재하지 않는 카테고리인 경우
 *
 * @see {SkinCategory} 스킨 카테고리 타입
 *
 * @example
 * // 전체 스킨 목록에서 5개의 스킨 프로필 샘플링
 * const samples = getSamples(5);
 *
 * @example
 * // '권총' 카테고리에서 3개의 스킨 프로필 샘플링
 * const categorySamples = getSamples(3, '권총');
 */
export function getSamples(
	n: number,
	category: SkinCategory,
): SkinProfile[] | Error;
export function getSamples(n: number): SkinProfile[] | Error;
export function getSamples(n: number, category?: SkinCategory) {
	// 스킨 리스트 로드
	const skinList = loadSkin();

	const filteredList = isString(category)
		? filterByCategory(skinList, category)
		: skinList;

	// 존재하지 않는 카테고리를 입력한 경우 (아예 입력하지 않은 경우는 삼항연산자에서 걸러짐)
	if (filteredList instanceof Error) return filteredList;
	// 요청 데이터 수가 전체 데이터 수보다 큰 경우
	if (skinList.length < n) {
		return new Error(
			`요청된 데이터 수(${n})가 전체 데이터 크기(${skinList.length})보다 큽니다.`,
		);
	}

	// 전체 인덱스 리스트 구성
	const indexes = range(0, filteredList.length);
	const sample_indices = sample(indexes, n);

	return sample_indices.map((indice) => filteredList[indice]);
}
