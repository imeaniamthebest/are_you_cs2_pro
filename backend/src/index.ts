import express from "express";
import cors from "cors";

import {
	answerRouter,
	categoryRouter,
	imageRouter,
	matchRouter,
	randomQuestionRouter,
	updateSkinListRouter,
} from "./routes";

const app = express();

app.use(cors());

app.use(
	answerRouter,
	categoryRouter,
	imageRouter,
	matchRouter,
	randomQuestionRouter,
	updateSkinListRouter,
);

app.all("*", (req, res) => {
	res.status(404).json({
		message: "존재하지 않는 경로입니다.",
	});
});

app.listen(4000, () => {
	console.log("서버가 포트 번호 4000에서 동작 중입니다.");
});
