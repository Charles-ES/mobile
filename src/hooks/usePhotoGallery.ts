import { useState } from "react";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export interface UserPhoto {
  data: string;
}

export function TakePhoto() {
  const [photo, setPhoto] = useState<UserPhoto[]>([]);
  const takePhoto = async () => {
    const p = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const base64Data = await base64FromPath(p.webPath!);
    setPhoto([
      {
        data: base64Data,
      },
      ...photo,
    ]);
  };
  return {
    photo,
    takePhoto,
  };
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };
    reader.readAsDataURL(blob);
  });
}
