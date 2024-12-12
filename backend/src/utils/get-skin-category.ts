import type { SkinProfile } from "../schemas";

/**
 * 스킨 프로필에서 카테고리 이름을 추출하여 반환합니다.
 *
 * @param profile
 * @returns
 */
export const getSkinCategory = (profile: SkinProfile) => profile.category.name;
