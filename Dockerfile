FROM node:19-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js", "Development", "Kebernetes"]

# # Setup Minikube
# brew install minikube
# minikube start --driver=docker
# # Setup Kubelet
# brew install kubectl

# # Setup Kubernet:
# docker buildx build --platform linux/amd64,linux/arm64 -t prasanti85/merneventsserver . --push
# kubectl create deployment merneventsserver --image=prasanti85/merneventsserver
# kubectl expose deployment merneventsserver --type=LoadBalancer --port=3000
# minikube service merneventsserver
# kubectl delete deployment merneventsserver && kubectl delete service merneventsserver

