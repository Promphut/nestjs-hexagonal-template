define _script
cat <<EOF > .env
PNPM_PATH=$(pnpm store path)
EOF
endef
export script = $(value _script)

PNPM_PATH := $(shell pnpm store path)

init:; eval "$$script"
	docker-compose -f docker-compose.init.yaml up --build --remove-orphans
	sudo chown -R ${USER} node_modules ${PNPM_PATH}
	sudo chmod -R 755 node_modules ${PNPM_PATH}

clean:; eval "$$script"
	docker-compose -f docker-compose.init.yaml down
	sudo rm -rf node_modules dist

clean-pnpm-path:; eval "$$script"
	sudo rm -rf ${PNPM_PATH}/files

start-dev:; eval "$$script"
	docker-compose up -d

start-dev-build:; eval "$$script"
	docker-compose up -d --build

down-dev:; eval "$$script"
	docker-compose down

restart-dev:; eval "$$script"
	docker-compose down && docker-compose up -d

restart-dev-build:; eval "$$script"
	docker-compose down && docker-compose up -d --build

restart-and-logs-dev:; eval "$$script"
	docker-compose down && docker-compose up -d && docker-compose logs -f

logs-dev:; eval "$$script"
	docker-compose logs -f

start-prod:
	docker-compose -f docker-compose.prod.yaml up -d

start-local-prod:
	docker-compose -f docker-compose.local-prod.yaml up -d

down-prod:
	docker-compose -f docker-compose.prod.yaml down

down-local-prod:
	docker-compose -f docker-compose.local-prod.yaml down

restart-prod:
	docker-compose -f docker-compose.prod.yaml down && docker-compose -f docker-compose.prod.yaml up -d

restart-local-prod:
	docker-compose -f docker-compose.local-prod.yaml down && docker-compose -f docker-compose.local-prod.yaml up -d

logs-prod:
	docker-compose -f docker-compose.prod.yaml logs -f

logs-local-prod:
	docker-compose -f docker-compose.local-prod.yaml logs -f
