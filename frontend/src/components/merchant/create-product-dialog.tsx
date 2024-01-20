"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { LuRefreshCw } from "react-icons/lu";
import axios from "axios";
import { useAccount } from "wagmi";
import { useState } from "react";

interface FormInterface {
  name: string;
  description: string;
  image: FileList;
  price: number;
}

const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const CreateProductDialog = ({
  children,
  onSuccess
}: {
  children: React.ReactNode;
  onSuccess?: (id: string) => void;
}) => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormInterface>();

  const { address } = useAccount();
  const onSubmit = async (data: FormInterface) => {
    if (!address) return;
    const base64 = await convertBase64(data.image[0]);
    if (typeof base64 !== "string") return;

    const res = await axios.post("/api/product/create", {
      userAddress: address,
      image: base64,
      name: data.name,
      description: data.description,
      price: data.price
    });
    onSuccess?.(res.data.id);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 max-h-[250px]">
                  {watch("image")?.[0] ? (
                    <img src={URL.createObjectURL(watch("image")[0])} className="w-full h-full p-2 rounded-xl" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    multiple={false}
                    className="hidden"
                    {...register("image", {
                      required: true,
                      validate: (files) => {
                        const file = files?.[0];
                        if (!file) return "No file selected";
                        if (!file.type.startsWith("image/")) return "Invalid file type";
                        if (file.size > 1024 * 1024 * 2) return "File too large";
                        return true;
                      }
                    })}
                  />
                </label>
              </div>
              {errors.image && (
                <span className="text-xs text-red-500">
                  {errors.image.type === "required" ? "Image is required" : errors.image.message}
                </span>
              )}
              <Input placeholder="Name" {...register("name", { required: true })} />
              {errors.name && <span className="text-xs text-red-500">Name is required</span>}
              <Input placeholder="Price ($)" {...register("price", { required: true })} />
              {errors.price && <span className="text-xs text-red-500">Price is required</span>}
              <Textarea placeholder="Description" {...register("description")} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button type="reset" variant="secondary">
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LuRefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Creating
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
