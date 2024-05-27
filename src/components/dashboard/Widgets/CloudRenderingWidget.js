import React, { useState } from 'react';
import axios from 'axios';

const CloudRenderingWidget = () => {
  const [renderJobId, setRenderJobId] = useState('');
  const [renderStatus, setRenderStatus] = useState('');
  const [renderedFileUrl, setRenderedFileUrl] = useState('');
  const [file, setFile] = useState(null);

  const startRenderJob = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await axios.post('/api/startRender', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setRenderJobId(response.data.jobId);
        checkRenderStatus(response.data.jobId);
      } catch (error) {
        console.error('Error starting render job:', error);
      }
    }
  };

  const checkRenderStatus = async (jobId) => {
    try {
      const response = await axios.get(`/api/renderStatus/${jobId}`);
      setRenderStatus(response.data.status);

      if (response.data.status === 'completed') {
        setRenderedFileUrl(response.data.fileUrl);
      } else if (response.data.status === 'processing') {
        setTimeout(() => checkRenderStatus(jobId), 5000);
      }
    } catch (error) {
      console.error('Error checking render status:', error);
    }
  };

  return (
    <div className="widget cloud-rendering">
      <h3>Cloud Rendering</h3>
      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={startRenderJob}>Start Render Job</button>
      </div>
      {renderJobId && (
        <div>
          <p><strong>Render Job ID:</strong> {renderJobId}</p>
          <p><strong>Status:</strong> {renderStatus}</p>
        </div>
      )}
      {renderedFileUrl && (
        <div>
          <p><strong>Rendered File URL:</strong> <a href={renderedFileUrl} target="_blank" rel="noopener noreferrer">{renderedFileUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default CloudRenderingWidget;
