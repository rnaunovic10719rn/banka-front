import React, { useState } from "react";
import Button from "./components/common/Button";
import Modal from "./components/common/Modal";
import Alert from "./components/common/Alert";

function App() {
	const [modal, setModal] = useState(false);
	const [alert, setAlert] = useState(true);

	return (
		<div>
			<header>
				<Button label="test" onClick={() => setModal(true)} />
				{alert && (
					<Alert
						text="TEST"
						design="success"
						onDismiss={() => setAlert(false)}
					/>
				)}
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
