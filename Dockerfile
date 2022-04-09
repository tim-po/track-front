FROM node:11.13.0
LABEL application="itmo-track"

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
