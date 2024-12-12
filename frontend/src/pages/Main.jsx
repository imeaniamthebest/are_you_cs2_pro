import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ky from "ky";

function Main() {
	const [skinDataUpdateMessage, setSkinDataUpdateMessage] = useState(undefined);
	// 서버에서 로드된 카테고리들
	const [categories, setCategories] = useState(undefined);

	// 선택한 문제 수 (기본값: 없음)
	const [selectedN, setSelectedN] = useState(undefined);
	// 선택한 분류 (기본값: 전체)
	const [selectedCategory, setSelectedCategory] = useState("all");

	const navigate = useNavigate();

	const modes = [
		10, 25, 50, 100, 300,
		500,
		// "무한모드"
	];

	/**
	 * 게임 시작 함수
	 *
	 * 문제 수, 스킨 분류를 sessionStorage에 저장하고 게임 페이지로 이동합니다.
	 */
	const playGame = async (n, category) => {
		if (n === undefined) {
			window.alert("문제 수가 선택되지 않았습니다!");
			return;
		}

		sessionStorage.setItem("n", n);
		sessionStorage.setItem("category", category);
		await navigate("/game");
	};

	const updateData = async () => {
		const response = await ky.get("http://localhost:4000/update-skin-list", {
			keepalive: true,
			retry: 3,
		});

		if (response.ok) {
			const eventSource = new EventSource(
				"http://localhost:4000/update-skin-list",
			);

			eventSource.onopen = () => {
				setSkinDataUpdateMessage("데이터 최신화 시작됨");
			};

			eventSource.onmessage = (ev) => {
				setSkinDataUpdateMessage(ev.data);
			};

			eventSource.onerror = (err) => {
				eventSource.close();
				console.error(err);
				setSkinDataUpdateMessage("데이터 최신화 중 오류 발생");
			};
		}
	};

	useEffect(() => {
		ky.get("http://localhost:4000/category")
			.json()
			.then((category) => {
				setCategories(category.categories);
			});
	}, []);

	return (
		<>
			<main className="responsive middle-align center-align">
				<article className="medium middle-align center-align medium-padding">
					<div>
						{/* 게임 아이콘 (https://fonts.google.com/icons?selected=Material+Symbols+Outlined:sports_esports:FILL@0;wght@400;GRAD@0;opsz@48&icon.query=game&icon.size=64&icon.color=%235f6368&icon.platform=web) */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="48px"
							viewBox="0 -960 960 960"
							width="48px"
							fill="#5f6368"
						>
							<title>Game Icon</title>
							<path d="M147-200q-38 0-59.5-25.5T72-296l48-335q8-53 49.5-91t94.5-38h433q53 0 94.5 38t49.5 91l47 335q6 45-15.5 70.5T813-200q-23 0-39-7.5T747-226L643-330H317L213-226q-11 11-27 18.5t-39 7.5Zm18-64 126-126h378l126 126q5 5 18 9 9 0 13.5-9t2.5-18l-48-339q-5-35-29.5-57T697-700H263q-30 0-54.5 22T179-621l-48 339q-2 9 2.5 18t13.5 9q7 0 18-9Zm535-176q16 0 28-12t12-28q0-16-12-28t-28-12q-16 0-28 12t-12 28q0 16 12 28t28 12Zm-85-130q16 0 28-12t12-28q0-16-12-28t-28-12q-16 0-28 12t-12 28q0 16 12 28t28 12ZM300-445h50v-75h75v-50h-75v-75h-50v75h-75v50h75v75Zm180-33Z" />
						</svg>

						<h5>Counter Strike 2 스킨 맞추기</h5>
						<p>스킨을 몇 개까지 맞출 수 있을까요?</p>
						<div className="space" />
						<nav className="center-align">
							<div className="field suffix border round">
								<select
									onChange={(ev) => {
										const selectedOption = ev.currentTarget.selectedOptions[0];

										setSelectedN(
											selectedOption.value === "undefined"
												? undefined
												: selectedOption.value,
										);
									}}
								>
									<option value="undefined">문제 수 선택하기</option>
									{modes.map((mode, index) => (
										<option value={mode} key={`select-${index.toString()}`}>
											{mode}개 시작하기
										</option>
									))}
								</select>
								<i>arrow_drop_down</i>
							</div>

							<div className="field suffix border round">
								<select
									onChange={(ev) => {
										const selectedOption = ev.currentTarget.selectedOptions[0];
										setSelectedCategory(selectedOption.value);
										console.log(selectedOption.value);
									}}
								>
									<option value="all">전체</option>
									{(categories ?? []).map((category, index) => (
										<option value={category} key={`select-${index.toString()}`}>
											{category}
										</option>
									))}
								</select>
								<i>arrow_drop_down</i>
							</div>
						</nav>

						<nav className="center-align middle-align">
							<button
								type="button"
								onClick={() => {
									updateData();
								}}
							>
								<div className="tooltip bottom medium-space">
									서버에 저장된 스킨 데이터를 최신화합니다.
								</div>
								스킨 데이터 갱신하기
							</button>

							<button
								type="button"
								onClick={() => {
									playGame(selectedN, selectedCategory);
								}}
							>
								<div className="tooltip bottom medium-space">
									서버에 저장된 스킨 데이터를 최신화합니다.
								</div>
								게임 시작하기
							</button>
						</nav>

						{skinDataUpdateMessage}
					</div>
				</article>
			</main>
		</>
	);
}

export default Main;
