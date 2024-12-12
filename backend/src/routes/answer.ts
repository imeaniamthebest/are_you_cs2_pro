import express from "express";
import { getSkinById, getSkinName } from "../utils";

const app = express();

app.get("/answer/:id", (req, res) => {
	const skin = getSkinById(req.params.id);

	if (skin === undefined) {
		res.status(404).json({
			message: "존재하지 않는 id입니다.",
		});
		return;
	}

	res.json({
		answer: getSkinName(skin),
	});
});

export { app as answerRouter };
