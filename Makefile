#CalTrak
#Environment
ENV_FILE=.env
#Install dependencies for server
install-server:
	npm install

#Run server in development mode
start-server:
	npm run dev

#Lint JavaScript files
lint:
	npm run lint

#Run all checks (install, lint)
check: install-server lint
code:
	code .
.PHONY: install-server start-server lint check code