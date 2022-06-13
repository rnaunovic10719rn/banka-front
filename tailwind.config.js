module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("nightwind")],
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
};
