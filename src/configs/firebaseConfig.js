import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAoBc8wZKVQBmRxzmvE08w0BnV1VvGPX50",
  authDomain: "novus-737e0.firebaseapp.com",
  databaseURL:
    "https://novus-737e0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "novus-737e0",
  storageBucket: "novus-737e0.appspot.com",
  messagingSenderId: "343610243090",
  appId: "1:343610243090:web:e6a3d0cc735279ece100cb",
  measurementId: "G-S02J7BRKSL",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const uploadFile = (file, getURL) => {
  const metadata = {
    contentType: file.type,
    cacheControl: "public,max-age=300",
  };
  const uploadTask = firebase
    .storage()
    .ref("media/" + Date.now())
    .put(file, metadata);
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function (snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    function (error) {
      // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          console.log(error.message);
          return null;

        case "storage/canceled":
          console.log(error.message);
          return null;

        case "storage/unknown":
          console.log(error.message);
          return null;

        default:
          console.log(error.message);
          return null;
      }
    },
    function () {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        getURL(downloadURL);
      });
    }
  );
};

export const deleteFileOnFirebase = (url, setDelStatus) => {
  const start = url.indexOf("media%2F") + 8;
  const end = url.indexOf("?");
  const fileName = url.substring(start, end);
  const desertRef = firebase.storage().ref('media/'+ fileName);

  // Delete the file
  return desertRef
    .delete()
    .then(() => {
      setDelStatus(1);
      console.log('Delete success');
    })
    .catch((error) => {
      setDelStatus(-1);
      console.log("Delete failed",error);
    });
};



export default uploadFile;
