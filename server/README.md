# Zenibar main backend server

### Install
```commandline
yarn install
```

### Build and run
```shell
yarn start
```

The web site and services are then accessible at http://localhost:8090/

To open the port on th firewall :
```shel
firewall-cmd --permanent --add-port=8090/tcp
firewall-cmd --reload
```