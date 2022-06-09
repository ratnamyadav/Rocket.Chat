---
to: apps/<%= name %>/package.json
---

{
	"name": "@rocket.chat/<%= name.toLowerCase() %>",
	"version": "0.0.1",
	"private": true,
	"devDependencies": {
		"@rocket.chat/apps-engine": "^1.19.0",
		"@types/node": "14.14.6",
		"@types/jest": "^27.4.1",
		"eslint": "^8.12.0",
		"jest": "^27.5.1",
		"ts-jest": "^27.1.4",
		"typescript": "~4.3.4"
	},
	"scripts": {
		"lint": "eslint --ext .js,.jsx,.ts,.tsx .",
		"lint:fix": "eslint --ext .js,.jsx,.ts,.tsx . --fix",
		"jest": "jest",
		"build": "rm -rf dist && tsc -p tsconfig.json"
	},
	"main": "./dist/index.js",
	"typings": "./dist/index.d.ts",
	"files": [
		"/dist"
	],
	"dependencies": {
	}
}