# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package.json /react-app
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
# docker buildx build --platform linux/amd64,linux/arm64 -t prasanti85/webmerneventsserver:eks -f Dockerfile.eks . --push
# kubectl create deployment merneventsserver --image=prasanti85/merneventsserver
# kubectl expose deployment merneventsserver --type=LoadBalancer --port=4000
# minikube service merneventsserver

# kubectl get deployments && kubectl get pods && kubectl get services
# kubectl delete deployment merneventsserver && kubectl delete service merneventsserver
# kubectl logs  <podname>  --all-containers