# BuildKit is a next generation container image builder. You can enable it using
# an environment variable or using the Engine config, see:
# https://docs.docker.com/develop/develop-images/build_enhancements/#to-enable-buildkit-builds
export DOCKER_BUILDKIT=1

LOGFILE=$(LOGPATH) `date +'%y.%m.%d %H:%M:%S'`


REPO_NAMESPACE ?= ${USER}
# GIT_TAG ?= $(shell git rev-parse --short HEAD)
# ifeq ($(GIT_TAG),)
# 	GIT_TAG=latest
# endif

GIT_TAG = 647



#  docker accessToken 8d07fad0-f93c-4122-aa4a-e47d0e9a2eea

HUB_PULL_SECRET ?= arn:aws:secretsmanager:us-east-1:570528589545:secret:dockerHubAccessToken-OL5AQh
FRONTEND_IMG = ewatergate-ui
REGISTRY_ID ?= 570528589545
DOCKER_PUSH_REPOSITORY=dkr.ecr.us-east-1.amazonaws.com

# aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 570528589545.dkr.ecr.us-east-1.amazonaws.com
# Local development happens here!
# This starts your application and bind mounts the source into the container so
# that changes are reflected in real time.
# Once you see the message "Running on http://0.0.0.0:5000/", open a Web browser at
# http://localhost:5000
.PHONY: dev
all: dev
dev: secret.txt
	@COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f docker-compose.dev.yml up --build

# docker tag ${FRONTEND_IMG} 570528589545.dkr.ecr.us-east-1.amazonaws.com/${FRONTEND_IMG}
# Run the unit tests.
# .PHONY: build-test unit-test test
# unit-test:
# 	@docker build --target test ./app

test: unit-test

create-ecr:
	aws ecr create-repository --repository-name ${FRONTEND_IMG}

build-image:
	docker --context default build  -t $(REGISTRY_ID).$(DOCKER_PUSH_REPOSITORY)/$(FRONTEND_IMG) ./app
	docker --context default build  -t $(FRONTEND_IMG) ./app



push-image-ecr:
	aws ecr get-login-password --region us-east-1 | docker login -u AWS --password-stdin $(REGISTRY_ID).$(DOCKER_PUSH_REPOSITORY)
	docker --context default push $(REGISTRY_ID).$(DOCKER_PUSH_REPOSITORY)/$(FRONTEND_IMG)

push-image-hub:
	docker --context default push $(FRONTEND_IMG)

deploy:
	HUB_PULL_SECRET=${HUB_PULL_SECRET} FRONTEND_IMG=${FRONTEND_IMG} docker compose --file ui-deploy.yml up

convert:
	HUB_PULL_SECRET=${HUB_PULL_SECRET} FRONTEND_IMG=${FRONTEND_IMG} docker compose convert

clean:
	@docker-compose rm -f || true
	@docker rmi ${FRONTEND_IMG}