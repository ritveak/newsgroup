# Use an official Node.js image to build the application
FROM node:14 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Use an official NGINX image to serve the application
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
