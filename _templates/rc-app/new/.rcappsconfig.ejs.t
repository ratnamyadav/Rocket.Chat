---
to: apps/<%= name %>/.rcappsconfig
---

{
	"url": "http://localhost:3000",
	"username": "",
	"password": "",
	"ignoredFiles": [
		"**/README.md",
		"**/package-lock.json",
		"**/package.json",
		"**/tsconfig.json",
		"**/*.js",
		"**/*.js.map",
		"**/*.d.ts",
		"**/*.spec.ts",
		"**/*.test.ts",
		"**/dist/**",
		"**/.*"
	]
}