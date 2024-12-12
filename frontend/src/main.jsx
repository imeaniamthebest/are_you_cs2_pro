import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Main from "./pages/Main.jsx";
import Game from "./pages/Game.jsx";

import "beercss";
import "material-dynamic-colors";
import Header from "./components/Header.jsx";

createRoot(document.getElementById("root")).render(
	<>
		<BrowserRouter>
			<Header />

			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/game" element={<Game />} />
			</Routes>
		</BrowserRouter>
	</>,
);
