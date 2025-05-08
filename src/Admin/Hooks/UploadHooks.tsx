import { colRef, storage } from "../../App";
import { doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { contextType } from "../../Types/Types";

// Simple unique ID generator (replaces uuid)
const generateUniqueId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

export const UploadFileStorage = () => {
  const uploadFilesToStorage = async (fileList: any[]) => {
    const filesData = await Promise.all(
      fileList.map(async (fileItem: any) => {
        // Access the actual file object via fileItem.originFileObj
        const file = fileItem.originFileObj;

        if (!file) {
          throw new Error('File object is missing!');
        }

        const imagePath = `images/${file.name}-${generateUniqueId()}`; // Use custom ID
        const storageRef = ref(storage, imagePath);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return {
          url: url,
          imagePath: imagePath,
        };
      })
    );
    return filesData;
  };

  const handleFilesDelete = async (items: contextType | null, id: any) => {
    try {
      // Check if the items and fileUrls are not null or undefined
      if (items && Array.isArray(items.fileUrls) && items.fileUrls.length > 0) {
        const imagePaths = items.fileUrls.map((img) => img.imagePath).filter(Boolean);
  
        // Loop through the image paths and delete them
        for (const imagePath of imagePaths) {
          const fileStorage = ref(storage, imagePath);
          await deleteObject(fileStorage);
          console.log(`Image ${imagePath} deleted from storage`);
        }
      }
  
      // Delete the document from Firestore
      const docRef = doc(colRef, id);
      await deleteDoc(docRef);
      console.log('Document deleted from Firestore');
    } catch (error) {
      console.error('Error deleting images or document:', error);
    }
  };
  

  return { uploadFilesToStorage, handleFilesDelete };
};
 