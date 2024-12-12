import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ky from "ky";

export default function Game() {
	const [n, setN] = useState(undefined);
	const [category, setCategory] = useState(undefined);

	const [skinIds, setSkinIds] = useState(undefined);
	const [currentImageUrl, setCurrentImageUrl] = useState(undefined);

	const [loading, setLoading] = useState(false);

	// 단계 정보
	const [stage, setStage] = useState(undefined);
	// 입력 정보
	const [input, setInput] = useState("");
	// 점수 정보
	const [score, setScore] = useState(0);

	const [matchMessage, setMatchMessage] = useState("");

	const navigate = useNavigate();

	const matchAnswer = async (id, input) => {
		if (!input) {
			window.alert("정답 입력란이 비어있습니다!");
			return;
		}

		return ky
			.get(`http://localhost:4000/match/${id}/${input}`)
			.json()
			.then((answer) => {
				const isOk = answer.ok;
				const $answer = answer.answer;

				if (isOk) {
					setScore((score) => score + 1);
					setMatchMessage("맞았습니다!");
				} else {
					setMatchMessage(`틀렸습니다! (정답: ${$answer})`);
				}

				setStage((stage) => stage + 1);
			});
	};

	useEffect(() => {
		if (skinIds === undefined) return;

		ky.get(`http://localhost:4000/answer/${skinIds[stage - 1]}`)
			.json()
			.then(console.log);
	}, [skinIds, stage]);

	useEffect(() => {
		if (!Number.isSafeInteger(n)) return;
		if (!Number.isSafeInteger(stage)) return;

		if (n < stage) {
			if (window.confirm(`게임 종료. 점수: ${score}/${n}`)) navigate("/");
			return;
		}
	}, [stage, n, score, navigate]);

	useEffect(() => {
		const skinId = skinIds?.at(stage - 1);

		// 없는 데이터는 무시
		if (stage === undefined) return;
		if (skinId === undefined) return;

		setLoading(true);

		ky.get(`http://localhost:4000/image/${skinId}`)
			.json()
			.then((image) => {
				setCurrentImageUrl(image.url);
				setLoading(false);
			});
	}, [skinIds, stage]);

	useEffect(() => {
		if (n === undefined) return;
		if (category === undefined) return;

		console.log(`문제 수 인식됨: ${n}`);
		console.log(`문제 분류 인식됨: ${category}`);
		// 모드에 따라 데이터 로드

		ky.get(`http://localhost:4000/random-question/${n}/${category}`)
			.json()
			.then((skins) => {
				setSkinIds(skins.skinIds);
				setStage(1);
				return skins.skinIds;
			});
	}, [n, category]);

	useEffect(() => {
		const $n = sessionStorage.getItem("n");
		const $category = sessionStorage.getItem("category");

		setN(Number.parseFloat($n));
		setCategory($category);
	}, []);

	return (
		<>
			<main
				className="responsive"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					placeItems: "center",
					gap: "1rem",
				}}
			>
				<h5>{stage}단계</h5>

				{loading ? (
					<progress className="circle" />
				) : (
					<img src={currentImageUrl} alt="" />
				)}

				<form
					action="#"
					onSubmit={(ev) => {
						ev.preventDefault();
						ev.stopPropagation();

						matchAnswer(skinIds.at(stage - 1), input);
					}}
					className="max"
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div className="field border label max">
						<input
							value={input}
							onInput={(ev) => {
								const text = ev.currentTarget.value;
								setInput(text);
							}}
						/>
						<label>정답 입력</label>
					</div>
					<button type="submit">제출</button>
				</form>

				<p>{matchMessage}</p>
			</main>
		</>
	);
}
