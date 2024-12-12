import { join, normalize } from "node:path";

// 요청 경로 정의
export const skinListUrl =
	"https://bymykel.github.io/CSGO-API/api/ko/skins.json";
export const skinNotGroupedUrl =
	"https://bymykel.github.io/CSGO-API/api/ko/skins_not_grouped.json";

// 저장 경로 정의
export const skinListPath = normalize(
	join(import.meta.dirname, "..", "assets", "skins.json"),
);
export const skinNotGroupedPath = normalize(
	join(import.meta.dirname, "..", "assets", "skins_not_grouped.json"),
);
