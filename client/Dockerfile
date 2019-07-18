FROM node as builder

RUN apt update \
    && apt install -y ca-certificates apt-transport-https curl \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt update \
    && apt install -y yarn

WORKDIR /var/www/html

COPY ./package.json ./yarn.lock ./

RUN yarn

COPY  . .

RUN yarn build


FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /var/www/html/build /var/www/html