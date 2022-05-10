import axios from "../../src/axios";

axios({
  method: "post",
  url: "/api/getResponse",
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res);
});

axios({
  method: "post",
  url: "/api/getResponse",
  responseType: "json",
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log(res);
});