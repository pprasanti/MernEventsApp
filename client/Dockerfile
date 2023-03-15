# Fetching the latest node image on alpine linux
FROM node:19-alpine AS builder

# Declaring env
ENV NODE_ENV Development

# Setting up the work directory
WORKDIR /usr/app

# Installing dependencies
COPY ./package.json ./

RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start


# # Setup Minikube
# brew install minikube
# minikube start --driver=docker
# # Setup Kubelet
# brew install kubectl

# # Setup EKS:
# docker buildx build --platform linux/amd64,linux/arm64 -t prasanti85/webmernserver:dev -f Dockerfile . --push
# kubectl create deployment webmernserver --image=prasanti85/webmernserver
# kubectl expose deployment webmernserver --type=LoadBalancer --port=4000
# minikube service webmernserver

# kubectl get deployments && kubectl get pods && kubectl get services
# kubectl delete deployment webmernserver && kubectl delete service webmernserver
# kubectl logs  <podname>  --all-containers