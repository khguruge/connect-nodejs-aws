const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const fileUpload = require("express-fileupload");

const server = app.listen(8080, () =>
    console.log("Server has started on port 8080")
);

app.use(fileUpload({
  limits: { fileSize: 1024 * 1024 * 1024 * 2}
}))


// upload-download files to aws
const AWSFileRoutes = require("./aws/aws.routes");
app.use(AWSFileRoutes);
