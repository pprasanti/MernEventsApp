# Fetching the latest node image on alpine linux
FROM node:19-alpine

# Declaring env
ENV NODE_ENV Development

# Setting up the work directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json .

RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["sh", "-c", "node src/server.js"]


# # Setup EKS:
# docker buildx build --platform linux/amd64,linux/arm64 -t prasanti85/apimernserver:dev -f Dockerfile . --push
# kubectl create deployment apimernserver --image=prasanti85/apimernserver
# kubectl expose deployment apimernserver --type=LoadBalancer --port=4000
# minikube service apimernserver

# kubectl get deployments && kubectl get pods && kubectl get services
# kubectl delete deployment apimernserver && kubectl delete service apimernserver
# kubectl logs  <podname>  --all-containers
