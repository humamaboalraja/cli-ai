FROM node:18

WORKDIR /src/cli

COPY package.json ./
RUN yarn install

COPY . .

# Placeholders ENV variables
ENV openai_api_token=

# Build the CLI & install it
RUN yarn build & yarn local

CMD cli-ai -ask "e.g. What is the meaning of life?"
