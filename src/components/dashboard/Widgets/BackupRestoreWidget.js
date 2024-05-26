import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const BackupRestoreWidget = () => {
  const [backupData, setBackupData] = useState(null);
  const [restoreData, setRestoreData] = useState(null);

  const handleBackup = () => {
    const data = {
      // Replace this with actual project data
      projectName: 'Example Project',
      createdAt: new Date().toISOString(),
      content: 'This is the project content.',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'project-backup.json');
  };

  const handleRestoreUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        setRestoreData(data);
      };
      reader.readAsText(file);
    }
  };

  const handleRestore = () => {
    if (restoreData) {
      // Replace this with actual restore logic
      console.log('Restored Data:', restoreData);
      alert('Project restored successfully!');
    } else {
      alert('No restore data available.');
    }
  };

  return (
    <div className="widget backup-restore">
      <h3>Backup and Restore</h3>
      <div>
        <button onClick={handleBackup}>Backup Project</button>
      </div>
      <div>
        <input type="file" accept="application/json" onChange={handleRestoreUpload} />
        <button onClick={handleRestore}>Restore Project</button>
      </div>
      {restoreData && (
        <div>
          <h4>Restore Data Preview</h4>
          <pre>{JSON.stringify(restoreData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BackupRestoreWidget;
