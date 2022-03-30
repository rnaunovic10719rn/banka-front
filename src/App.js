import React, { useState } from "react";
import Button from "./components/common/Button";
import Modal from "./components/common/Modal";

function App() {
	const [modal, setModal] = useState(false);

	return (
		<div>
			<header>
				<Button label="test" onClick={() => setModal(true)} />
				<Modal
					visible={modal}
					title="Modal"
					onClose={() => setModal(false)}
				>
					<p>TEST123</p>
				</Modal>
			</header>
		</div>
	);
}

export default App;
