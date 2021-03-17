# pull the base image
FROM mhart/alpine-node:14.15.5

# set the working direction
WORKDIR /

# add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install -g react
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]
