# pull the base image
FROM mhart/alpine-node:14.15.5

LABEL maintainer="GMMP" \
      name="site-4proj" \
      version="2.0"
      
# set the working direction
WORKDIR /

# add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY webapp/package.json ./

COPY webapp/package-lock.json ./

RUN npm ci
RUN npm install -g react

# add app
COPY webapp/. ./

# build app for production
RUN npm run build

# serve app
RUN npm install -g serve
CMD ["serve", "-s", "/build", "-l", "3000"]