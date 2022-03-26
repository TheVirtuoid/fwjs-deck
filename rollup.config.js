import { terser } from "rollup-plugin-terser";

export default {
	input: "src/Deck/Deck.js",
	output: [{
		file: "dist/Decks.min.js",
		format: "es",
		generatedCode: "es2015",
		minifyInternalExports: false,
		plugins: [terser({
			keep_classnames: true
		})],
		exports: "named"
	}]
}