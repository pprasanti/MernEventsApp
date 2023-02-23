FROM node:19-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "src/server.js", "Development", "Kubernetes"]

# # Setup Minikube
# brew install minikube
# minikube start --driver=docker
# # Setup Kubelet
# brew install kubectl

# # Setup Kubernet:
# docker buildx build --platform linux/amd64,linux/arm64 -t prasanti85/merneventsserver ./kubernetes --push
# kubectl create deployment merneventsserver --image=prasanti85/merneventsserver
# kubectl expose deployment merneventsserver --type=LoadBalancer --port=4000
# minikube service merneventsserver

# kubectl get deployments && kubectl get pods && kubectl get services
# kubectl delete deployment merneventsserver && kubectl delete service merneventsserver
# kubectl logs  <podname>  --all-containers
