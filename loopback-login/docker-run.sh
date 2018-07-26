docker build -t loopback-login .
docker run -dit -p 127.0.0.1:10001:80 --name loopback-login-web loopback-login
