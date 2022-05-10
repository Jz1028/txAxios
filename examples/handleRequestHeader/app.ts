import axios from "../../src/axios";
axios({
  method: "post",
  url: "/api/handleRequestHeader/post",
  data: {
    a: 1,
    b: 2
  }
});

axios({
  method: "post",
  url: "/api/handleRequestHeader/post",
  headers: {
    "content-type": "application/json; charset=UTF-8",
    "Accept": "application/json,text/plain,*/*"
  },
  data: {
    a: 1,
    b: 2
  }
});

const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);

axios({
  method: "post",
  url: "/api/handleRequestHeader/post",
  data: searchParams
});