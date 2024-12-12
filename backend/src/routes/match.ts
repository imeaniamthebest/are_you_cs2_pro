// 문제 id와 정답을 입력하면 문제의 정답 여부를 반환합니다.

import express from "express";
import { getSkinById, getSkinName } from "../utils";

const app = express();

app.get("/match/:id/:input", (req, res) => {
	const { id, input } = req.params;

	const skin = getSkinById(id);

	if (skin === undefined) {
		res.status(404).json({
			message: "존재하지 않는 스킨 id입니다.",
		});
		return;
	}

	const name = getSkinName(skin);

	res.json({
		ok: name === input,
		answer: name,
	});
});

export { app as matchRouter };
