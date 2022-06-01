const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true}, (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('Connected to database succesfully');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const data = fs.readFileSync("./database.json");
// 해당 환경설정 데이터를 파싱 해서 가져올 수 있도록 함
// const conf = JSON.parse(data);

// require에 있는 mysql 라이브러리를 불러와서 변수 mysql에 담도록 함
// const mysql = require("mysql");

// // 실질적으로 연결하는 부분
// const connection = mysql.createConnection({
//   host: conf.host,
//   user: conf.user,
//   password: conf.password,
//   port: conf.port,
//   database: conf.database,
// });
// connection.connect();

// file처리를 위해서 multer라이브러리를 npm install --save multer 로 설치함
// multer 라이브러리를 불러옴
const multer = require("multer");
const exp = require("constants");

// 서버에 기본 루트폴더에 있는 upload폴더에 사용자의 파일을 업로드 하는 공간으로 함
const upload = multer({ dest: "./upload" });

// api경로에 hello로 접속을 하면 아래 메시지를 보내도록 함
// app.get("/api/hello", (req, res) => {
//   res.send({ massage: "Hello Express!" });
// });

app.get("/api/customers", (req, res) => {
  connection.query(
    // 삭제되지 않은 데이터만 가져와야 하기 때문에 WHERE isDeleted = 0 을 추가함
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    //가져온 데이터는 rows라는 변수로 처리
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// 사용자가 실제로 접근해서 프로필 이미지를 확인할 수 있도록 하기 위해서
// upload 폴더를 공유할 수 있도록 static으로 함
// image 폴더에서 해당 upload폴더로 접근할 수 있도록 함
// 사용자 입장에서는 image라는 이름의 경로로 접근을 하는데 실제 서버의 upload폴더와 맵핑이 됨
app.use("/image", express.static("./upload"));

// post형식으로 사용자가 고객추가 데이터를 전송 했을 떄 처리하는 부분
app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  // 앞에 sql구문에 나머지 5개가 정확히 어떤 것인지 설정
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";

  // id를 선택해서
  let params = [req.params.id];

  // 쿼리부분을 지우겠다고 해줌
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 서버가 동작중이면 동작중인 것을 알려줄 수 있도록 출력
// console.log에 따옴표는 숫자1키 왼쪽에 있는 물결표 아래 특수문자로 해야
// 문자열 안에 ${port}같은 변수를 출력 할 수 있음
app.listen(port, () => console.log(`Listening on port ${port}`));
