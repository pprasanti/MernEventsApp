# Fetching the latest node image on alpine linux
FROM node:19-alpine

# Declaring env
ENV NODE_ENV Development

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package.json .

RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["sh", "-c", "npm run start"]


# # Setup EKS:
# docker buildx build --platform linux/amd64,linux/arm64 -t prasanti85/mernbackend:dev -f Dockerfile . --push
# kubectl create deployment mernbackend --image=prasanti85/mernbackend
# kubectl expose deployment mernbackend --type=LoadBalancer --port=4000
# minikube service mernbackend

# kubectl get deployments && kubectl get pods && kubectl get services
# kubectl delete deployment mernbackend && kubectl delete service mernbackend
# kubectl logs  <podname>  --all-containers
