// 문제 샘플링 함수

// 분류와 문제 수 n을 입력하면 랜덤하게 n 개의 문제를 샘플링 할 수 있습니다.
// 분류가 "all"로 입력되면, 모든 스킨 종류를 대상으로 합니다.
// 전체 데이터보다 n이 크면 400(BAD_REQUEST)와 메시지를 반환합니다.

import express from "express";

import { getAllSkinCategory } from "../utils";
import { getSamples } from "../sampler";
import { isSkinCategory } from "../validators";

const app = express();

app.get("/random-question/:n/:category", (req, res) => {
	// 파라미터 추출
	const { n, category } = req.params;

	// n 데이터를 숫자 형태로 변환함.
	const parsedN = Number.parseFloat(n);

	// n 검증
	if (!Number.isSafeInteger(parsedN)) {
		res.status(400).json({
			message: "문제 수가 입력되지 않았습니다. (숫자가 아님)",
		});
		return;
	}

	// 분류 데이터 검증
	// 사전 정의된 분류 중 하나에 속하거나 / 전체 분류(all)가 지정됨
	if (!(isSkinCategory(category) || category === "all")) {
		res.status(400).json({
			message: "분류 정보가 유효하지 않습니다",
		});
		return;
	}

	// 원하는 수의 문제 샘플링하기
	const samples =
		category === "all" ? getSamples(parsedN) : getSamples(parsedN, category);

	// n이 전체 데이터 수보다 큰 경우 검사
	if (samples instanceof Error) {
		res.status(400).json({
			message: samples.message,
		});
		return;
	}

	// 문제 ID만 추출하여 반환
	res.json({
		skinIds: samples.map((sample) => sample.id),
	});
});

export { app as randomQuestionRouter };
