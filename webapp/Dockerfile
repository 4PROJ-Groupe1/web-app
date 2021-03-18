# pull the base image
FROM mhart/alpine-node:14.15.5

LABEL maintainer="GMMP" \
      name="site-4proj" \
      version="1.0"
      
# set the working direction
WORKDIR /

# add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install -g react
RUN npm install

EXPOSE 3000

# add app
COPY . ./

# start app
CMD ["npm", "start"]
