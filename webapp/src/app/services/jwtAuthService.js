import axios from "axios";
import localStorageService from "./localStorageService";
import userService from "./UserService";

class JwtAuthService {

  // Dummy user object just for the demo
  user = {
    userId: "1",
    role: 'ADMIN',
    displayName: "Jason Alexander",
    email: "jasonalexander@gmail.com",
    photoURL: "/assets/images/face-6.jpg",
    age: 25,
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  }

  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, password) => {


    return new Promise((resolve, reject) => {
      userService.login(email,password).then(
        result => {
          result.json().then(
            data => {
              if (result.ok) {
                console.log("LOGIN SUCCESS : ", data);
                // Login successful
                // Save token
                this.setSession(data.token);
                // Set user
                const userData = JSON.parse(atob(data.token.split(".")[1]))
                this.setUser(userData);
                resolve(userData);
              } else {
                console.log("error thrown : ", data.error);
                reject(data.error);
              }
            }
          )
        },
        err => {
          console.log("LOGIN ERROR : ", err);
          throw new Error(err);
        }
      ).catch(error => {console.log(error)})
    });
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      userService.verifyToken(window.localStorage.getItem("jwt_token")).then(
          result => {
            result.json().then(
                res => {
                  console.log("result verifytoken: ", result);
                  if (result.ok) {
                    console.log("token verified : ", res);
                    this.setSession(res.token);
                    this.setUser(res.user);
                    resolve(res.user);
                  } else {
                    console.log("bad / no token");
                    reject(res.error);
                  }
                }
            )
          },
          error => {
            reject(error);
          }
      )
    });
  };

  // loginWithToken = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.user);
  //     }, 100);
  //   }).then(data => {
  //     // Token is valid
  //     this.setSession(data.token);
  //     this.setUser(data);
  //     return data;
  //   });
  // };

  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = token => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {    
    localStorageService.setItem("auth_user", user);
  }
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new JwtAuthService();
