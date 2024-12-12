// 스킨 분류를 반환합니다.

import express from "express";
import { getAllSkinCategory } from "../utils";

const app = express();

app.get("/category", (req, res) => {
	// 추출된 스킨 카테고리 반환
	res.json({
		categories: getAllSkinCategory(),
	});
});

export { app as categoryRouter };
