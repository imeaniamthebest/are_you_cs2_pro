import type { SkinProfile } from "../schemas";

/**
 * 스킨 프로필에서 이름 추출하는 함수
 *
 * - 퀴즈 답변으로 사용하기 어려운 기호들은 제거합니다.
 *
 * @example
 * getSkinName("★갈고리 칼 | 그을림 (막 출고된)")  // 갈고리 칼 | 그을림 (막 출고된)
 *
 * @param profile
 * @returns
 */
export const getSkinName = (profile: SkinProfile) => {
	// 스킨 이름 가져오기
	const { name } = profile;

	return (
		name
			// NOTE: 상태 표시자 (꽤 닳은, 현장에서 쓰인, 막 출고된 등) 제거 코드
			// .replace(/\((.+)\)/g, "")
			// 키보드로 입력하기 어려운 ★를 제거함.
			.replace(/^★/, "")
			// 키보드로 입력하기 어려운 ™을 (TM)으로 대체함.
			.replace(/™/g, "(TM)")
			// 좌우 공백 제거
			.trim()
	);
};
