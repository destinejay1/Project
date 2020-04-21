var BucketName = "cs-dept-files";
var bucketRegion = "us-east-2";
var IdentityPoolId = "us-east-2:9f572ebe-f715-410d-a40d-35cfff5d268c";

const bucketUrl = `https://s3.amazonaws.com/${BucketName}`
//uses the AWS SDK
//updates its configuration with your credentials and bucket region
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});
//uses the AWS SDK
//creates an S3 service object that can interact with your bucket
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: BucketName }
});

function addFile() {
  const files = document.getElementById('upload').files;
  const file = files[0];
  const fileName = file.name;
  
 // Use S3 ManagedUpload class as it supports multipart uploads
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BucketName,
      Key: fileName,
      Body: file,
      ACL: "public-read"
    }
  });
  
  var promise = upload.promise();

  promise.then(
    function(data) {
      alert("Successfully uploaded file.");
    },
    function(err) {
      return alert("There was an error uploading your file: ", err.message);
    }
  );
}