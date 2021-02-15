# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /

# add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install -g react
RUN npm install -g npm@7.5.4

# add app
COPY . ./

# start app
CMD ["npm", "start"]