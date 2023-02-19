# FROM node:14.16.0
FROM public.ecr.aws/bitnami/node:14-prod-debian-10
# FROM public.ecr.aws/bitnami/node:14.16.0-debian-10-r8
# FROM public.ecr.aws/bitnami/node:14.15.1-debian-10-r8

# RUN mkdir /app

WORKDIR  /app

COPY package.json .

COPY prisma ./prisma/

RUN npm install

RUN npm run build

RUN ls -a

COPY .next .next
# Install app dependencies
# RUN npm install

COPY prisma ./prisma/
# Generate prisma client, leave out if generating in `postinstall` script
RUN npm install prisma -g
RUN prisma generate
# RUN npm install
COPY . . 

# RUN npm run build


EXPOSE 80

CMD [ "npm", "run", "start"]




# # Build the app
# FROM node:14-alpine as build
# WORKDIR /app

# COPY . .
# RUN npm i
# # RUN npm run build
# COPY ./.next ./.next


# # Run app
# FROM node:14-alpine

# # Only copy files required to run the app
# COPY --from=build /app/.next ./
# COPY --from=build /app/package.json ./
# COPY --from=build /app/package-lock.json ./

# EXPOSE 80

# # Required for healthcheck defined in docker-compose.yml
# # If you don't have a healthcheck that uses curl, don't install it
# RUN apk --no-cache add curl

# # By adding --production npm's devDependencies are not installed
# RUN npm ci --production
# RUN ./node_modules/.bin/next telemetry disable

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# USER nextjs
# CMD ["npm", "start"]
