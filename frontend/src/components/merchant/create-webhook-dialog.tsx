import { WebhookEvents } from "@/interfaces/webhook";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuRefreshCw } from "react-icons/lu";
import _ from "lodash";

interface FormInterface {
  url: string;
  events: WebhookEvents[];
}

export const CreateWebhookDialog = ({
  children,
  onSuccess
}: {
  children: React.ReactNode;
  onSuccess?: (id: string) => void;
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormInterface>();

  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: FormInterface) => {
    if (!address) return;

    const res = await axios.post("/api/webhook/create", {
      userAddress: address,
      url: data.url,
      events: data.events
    });
    onSuccess?.(res.data.id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="mb-2">Add Webhook</DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <Input placeholder="Url" {...register("url", { required: true })} />
              {errors.url && <span className="text-xs text-red-500">Url is required</span>}
              {Object.values(WebhookEvents).map((event) => (
                <label key={event} className="flex items-center gap-2">
                  <input type="checkbox" {...register("events", { required: true })} value={event} />
                  {_.startCase(event)}
                </label>
              ))}
              {errors.events && <span className="text-xs text-red-500">At least one event is required</span>}
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
