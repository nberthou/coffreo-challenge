FROM node:22-bookworm-slim AS node

RUN apt-get update \
      && apt-get -y install \
       make \
       git \
       openssh-client

# build for production
ENV NODE_ENV=dev

WORKDIR /var/www

# Install JS dependencies
COPY yarn.lock .
COPY package.json .

# We may need @types/node at build-time when using explicit types for Node.
# We of course need to do it with care.
RUN yarn install --production=false

COPY tsconfig.json .
COPY . .

RUN yarn run build

RUN rm yarn.lock tsconfig.json
RUN rm -rf src

# Don't worry, it's just npm prune --production
# Facebook doing his strange opiniated stuff gain.
RUN yarn install --production --ignore-scripts --prefer-offline

CMD yarn run start

EXPOSE 4000
