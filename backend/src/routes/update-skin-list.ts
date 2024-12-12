// 스킨 리스트 데이터를 업데이트하는 라우터입니다.

import express from "express";
import ky from "ky";

import { writeFileSync } from "node:fs";
import {
	skinListPath,
	skinListUrl,
	skinNotGroupedPath,
	skinNotGroupedUrl,
} from "../paths";

const app = express();

app.all("/update-skin-list", async (req, res) => {
	// SSE 헤더 설정
	res.setHeader("Content-Type", "text/event-stream;charset=UTF-8");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");
	res.setHeader("Keep-Alive", "timeout=10,max=1000");

	try {
		// 이벤트 보내기 함수
		const sendEvent = (message: string) => {
			res.write(`data: ${message}\n\n`);
		};

		sendEvent("데이터 다운로드 시작");

		// 데이터 요청
		const [skinList, skinNotGroupedList] = await Promise.all([
			ky.get(skinListUrl).text(),
			ky.get(skinNotGroupedUrl).text(),
		]);

		sendEvent("데이터 다운로드 완료");

		// 파일 저장
		writeFileSync(skinListPath, skinList);
		sendEvent("스킨 리스트 저장 완료");

		writeFileSync(skinNotGroupedPath, skinNotGroupedList);
		sendEvent("미분류 스킨 리스트 저장 완료");

		// 최종 완료 이벤트
		sendEvent("모든 데이터 업데이트 완료");

		// 연결 유지
		req.on("close", () => {
			res.end();
		});
	} catch (error) {
		console.error("Error during skin list update:", error);
		res.write(
			`data: 오류 발생: ${error instanceof Error ? error.message : "알 수 없는 오류"}\n\n`,
		);
		res.end();
	}
});

export { app as updateSkinListRouter };
