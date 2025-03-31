'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { IVideoFormData } from "@/types/studio.types";
import { UploadVideoForm } from "./UploadVideoForm";
import { DragNDropVideo } from "./DragNDropVideo";
import { ProgressVideoProcessing } from "./ProgressVideoProcessing";

export function UploadVideoPage() {
  const [isReadyToPublish, setIsReadyToPublish] = useState<boolean>(false);

  const form = useForm<IVideoFormData>({
    mode: 'onChange'
  });

  const fileName = form.watch('videoFileName');

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80">
      <div className="flex flex-col items-center justify-center px-8 py-6 bg-inherit rounded-2xl border border-gray-400 max-w-[60rem] w-[85%]">
        <h3 className="mb-5">Upload video</h3>

        <DragNDropVideo reset={form.reset} />

        <ProgressVideoProcessing 
          fileName={fileName} 
          setIsReadyToPublish={setIsReadyToPublish} 
          isReadyToPublish={isReadyToPublish}  
        />

        {!!fileName && <UploadVideoForm form={form} isReadyToPublish={isReadyToPublish} />}

      </div>
    </div>
  )
}
