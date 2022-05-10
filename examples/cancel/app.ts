import axios from "../../src/axios";
import { Canceler } from "../../src/types";

const CancelToken = axios.CancelToken;
let cancel: Canceler;

axios.get("/api/cancel", {
    cancelToken: new CancelToken(c => {
      cancel = c;
    })
  })
  .catch(function(e) {
    console.log(e);
  });

setTimeout(() => {
  cancel("Operation canceled by the user");
}, 1000);