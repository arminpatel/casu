'use client';

import { useState, ChangeEvent, DragEvent } from 'react';
import styles from './PdfDropZone.module.css';

export default function PdfDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (file: File | null) => {
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Invalid file type. Please upload a PDF.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
      setUploadStatus('Uploading...');
    } else {
      setSelectedFile(null);
      setUploadStatus(null);
    }
    setTimeout(() => handleSubmit(), 3000);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setError(null);
    setUploadStatus(null);

  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
        return;
    }
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log(e.dataTransfer.files);
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    console.log(selectedFile, "selectedFile");
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }

    setUploadStatus('Uploading...');
    setError(null);

    const formData = new FormData();
    formData.append('casFile', selectedFile);

    try {
      const response = await fetch('http://localhost:8080/api/v1/cas/upload', {
        method: 'POST',
        body: formData,
      });

      console.log(response);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Server responded with ${response.status}`);
      }

      setUploadStatus(`Successfully uploaded: ${result.fileName}`);
      setSelectedFile(null);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Upload failed. Please try again.');
      setUploadStatus(null);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p className={styles.dropzoneText}>
          Drag and drop a PDF here, or
        </p>
        <label htmlFor="file-upload" className={styles.browseButton}>
          <span className={styles.buttonText}>Browse Files</span>
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className={styles.fileInput}
          accept=".pdf"
          onChange={handleFileSelect}
        />
      </div>

      {!error && uploadStatus && <p className={styles.statusMessage}>{uploadStatus}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
