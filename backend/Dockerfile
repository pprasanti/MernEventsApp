FROM node:19-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV ENVIRONMENT Development
RUN echo "${ENVIRONMENT}"

CMD ["sh", "-c", "node src/server.js ${ENVIRONMENT}"]


# # Setup EKS:
# docker buildx build --platform linux/amd64,linux/arm64 -t prasanti85/merneventsserver:dev -f Dockerfile . --push
# kubectl create deployment merneventsserver --image=prasanti85/merneventsserver
# kubectl expose deployment merneventsserver --type=LoadBalancer --port=4000
# minikube service merneventsserver

# kubectl get deployments && kubectl get pods && kubectl get services
# kubectl delete deployment merneventsserver && kubectl delete service merneventsserver
# kubectl logs  <podname>  --all-containers
