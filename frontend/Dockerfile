# Fetching the latest node image on alpine linux
FROM node:19-alpine AS builder

# Declaring env
ENV NODE_ENV Development

# Setting up the work directory
WORKDIR /app

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
# docker buildx build --platform linux/amd64,linux/arm64 -t prasanti85/mernfrontend:dev -f Dockerfile . --push
# kubectl create deployment mernfrontend --image=prasanti85/mernfrontend
# kubectl expose deployment mernfrontend --type=LoadBalancer --port=4000
# minikube service mernfrontend

# kubectl get deployments && kubectl get pods && kubectl get services
# kubectl delete deployment mernfrontend && kubectl delete service mernfrontend
# kubectl logs  <podname>  --all-containers