import React, { useState } from 'react';
import AWS from 'aws-sdk';

const CloudIntegrationWidget = () => {
  const [bucketName, setBucketName] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [files, setFiles] = useState([]);

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
  });

  const uploadFile = () => {
    if (file && bucketName) {
      const params = {
        Bucket: bucketName,
        Key: file.name,
        Body: file,
        ACL: 'public-read',
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.error('Error uploading file:', err);
        } else {
          setUploadedFileUrl(data.Location);
          fetchFiles();
        }
      });
    }
  };

  const fetchFiles = () => {
    if (bucketName) {
      const params = {
        Bucket: bucketName,
      };
      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.error('Error fetching files:', err);
        } else {
          setFiles(data.Contents);
        }
      });
    }
  };

  return (
    <div className="widget cloud-integration">
      <h3>Cloud Integration</h3>
      <div>
        <label>Bucket Name:</label>
        <input
          type="text"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
      {uploadedFileUrl && (
        <div>
          <p><strong>Uploaded File URL:</strong> <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">{uploadedFileUrl}</a></p>
        </div>
      )}
      <div>
        <button onClick={fetchFiles}>Fetch Files</button>
        <ul>
          {files.map((file) => (
            <li key={file.Key}>
              <a href={`https://${bucketName}.s3.amazonaws.com/${file.Key}`} target="_blank" rel="noopener noreferrer">
                {file.Key}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CloudIntegrationWidget;
