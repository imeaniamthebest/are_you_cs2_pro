// 문제 id를 입력하면 문제의 이미지를 반환합니다.

import express from "express";
import { getSkinById } from "../utils";

const app = express();

app.get("/image/:id", (req, res) => {
	const id = req.params.id;
	const skin = getSkinById(id);

	if (skin === undefined) {
		res.status(404).json({
			message: "존재하지 않는 스킨 id입니다.",
		});
		return;
	}

	const imageUrl = skin?.image;

	if (imageUrl === undefined) {
		res.status(404).json({
			message: "존재하지 않는 스킨입니다.",
		});
		return;
	}

	res.json({
		url: imageUrl,
	});
});

export { app as imageRouter };
