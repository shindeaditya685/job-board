"use client";
import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_PROJECT_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
);

const ImageUpload = ({
  icon,
  name,
  defaultValue = "",
}: {
  icon: IconDefinition;
  name: string;
  defaultValue: string;
}) => {
  const uniqueId = uniqid();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>(defaultValue);
  const [path, setPath] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input && input.files?.length && input.files.length > 0) {
      setFile(input.files[0]);
      setIsUploading(true);
    }
  };

  const upload = async () => {
    if (!file) return;

    const { data, error } = await supabaseClient.storage
      .from("job-board-files")
      .upload(`/public/${uniqueId}-${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      const path = data.path;
      setPath(path);
      getPublicUrls(path);
    }

    if (error) {
      console.error("Upload error:", error.message);
      setIsUploading(false); // Ensure uploading state is reset on error
      setIsImageLoading(true);
    }
  };

  const getPublicUrls = (path: string) => {
    const { data } = supabaseClient.storage
      .from("job-board-files")
      .getPublicUrl(path);
    const imageUrl = data?.publicUrl;
    setUrl(imageUrl || "");
    setIsUploading(false);
    setIsImageLoading(true);
  };

  useEffect(() => {
    if (file) {
      upload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const imgLoading = isUploading || isImageLoading;
  return (
    <>
      <div className="border-2 border-gray-300 border-dotted bg-gray-100 size-24 inline-flex items-center content-center justify-center rounded-md">
        {imgLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-gray-400 animate-spin"
          />
        )}{" "}
        {!isUploading && url && (
          <Image
            src={url}
            alt="uploaded img"
            width={1024}
            height={1024}
            onLoadingComplete={() => setIsImageLoading(false)}
            className="w-auto h-auto max-w-24 max-h-24 object-cover"
            defaultValue={defaultValue}
          />
        )}{" "}
        {!imgLoading && !url && (
          <FontAwesomeIcon icon={icon} className="text-gray-400" />
        )}
      </div>
      <input type="hidden" value={url} name={name} />
      <div className="mt-2">
        <input
          onChange={handleFileChange}
          ref={fileInputRef}
          type="file"
          className="hidden"
        />
        <Button
          type="button"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          variant="soft"
        >
          Select file
        </Button>
      </div>
    </>
  );
};

export default ImageUpload;
