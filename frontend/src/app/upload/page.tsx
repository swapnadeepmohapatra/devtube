"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "@/config/keys";
import Dropzone from "react-dropzone";
import styles from "./index.module.css";
import { MdPublish } from "react-icons/md";

function Upload() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [state, setState] = useState({
    title: "",
    description: "",
    author: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();

      if (!isAuth) {
        toast.error("You need to login first.");
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { title, description, author } = state;

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (!title || !description) {
      toast.error("Title and Description are required fields.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("filename", selectedFile?.name || "");
      const initializeRes = await axios.post(
        `${BACKEND_URL}/upload/initialize`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const { uploadId } = initializeRes.data.data;
      console.log("Upload id is ", uploadId);

      const chunkSize = 5 * 1024 * 1024; // 5 MB chunks
      const totalChunks = Math.ceil((selectedFile?.size || 1) / chunkSize);

      let start = 0;

      const uploadPromises = [];

      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const chunk = selectedFile?.slice(start, start + chunkSize);
        start += chunkSize;
        const chunkFormData = new FormData();
        chunkFormData.append("filename", selectedFile?.name || "");
        chunkFormData.append("chunk", chunk || "");
        chunkFormData.append("totalChunks", totalChunks.toString());
        chunkFormData.append("chunkIndex", chunkIndex.toString());
        chunkFormData.append("uploadId", uploadId);

        const uploadPromise = axios
          .post(`${BACKEND_URL}/upload`, chunkFormData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            setProgress((prev) => {
              let total = prev + Math.ceil(100 / totalChunks);
              return total > 100 ? 100 : total;
            });
          });
        uploadPromises.push(uploadPromise);
      }

      await Promise.all(uploadPromises);

      const completeRes = await axios.post(
        `${BACKEND_URL}/upload/complete`,
        {
          filename: selectedFile?.name,
          totalChunks: totalChunks,
          uploadId: uploadId,
          title: title,
          description: description,
          author: author,
        },
        { withCredentials: true }
      );

      toast.success("Upload Done! File uploaded successfully.");

      // setState({
      //   title: "",
      //   description: "",
      //   author: "",
      // });

      // setSelectedFile(null);

      console.log(completeRes.data);
    } catch (error) {
      toast.error("Error uploading file");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Upload new video</h1>
      <form encType="multipart/form-data" className={styles.formContainer}>
        <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className={styles.uploadContainer} {...getRootProps()}>
                <input {...getInputProps()} />
                <MdPublish className={styles.publishIcon} />
                {selectedFile ? (
                  <h4>{selectedFile.name}</h4>
                ) : (
                  <h4>Drag and drop video files to upload</h4>
                )}
              </div>
            </section>
          )}
        </Dropzone>

        {(uploading || progress > 0) && (
          <div className={styles.progressContainer}>
            {progress < 100 ? "Uploading..." : "Uploaded!"}
            <div className={styles.progressParent}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className={styles.inputContainer}>
          <label htmlFor="title">Title*</label>
          <input
            type="title"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Description*</label>
          <input
            type="description"
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={onChange}
          />
        </div>
        <button
          className={styles.submitButton}
          type="button"
          onClick={handleUpload}
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
