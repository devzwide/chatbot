FROM devzwide/chatbot-api:latest
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 8000
CMD ["npm", "start"]
