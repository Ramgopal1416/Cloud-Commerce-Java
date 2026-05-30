import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function Account() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const onSubmit = (data: ProfileForm) => {
    updateProfileMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Profile updated",
            description: "Your information has been successfully updated.",
          });
          queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
        },
        onError: () => {
          toast({
            title: "Update failed",
            description: "There was an issue updating your profile.",
            variant: "destructive",
          });
        }
      }
    );
  };

  if (!user) {
    return <div className="flex-1 flex items-center justify-center py-24"><p className="font-serif italic text-muted-foreground">Please sign in to view your account.</p></div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-2xl">
      <h1 className="text-4xl font-serif mb-8">Account Settings</h1>

      <div className="bg-muted/30 border border-border/50 p-8 space-y-8">
        <div>
          <h2 className="text-sm font-medium tracking-widest uppercase mb-6 text-muted-foreground">Profile Information</h2>
          
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-4">
              <span className="text-muted-foreground text-sm uppercase tracking-wider">Email</span>
              <span className="col-span-2 font-medium">{user.email}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-4">
              <span className="text-muted-foreground text-sm uppercase tracking-wider">Member Since</span>
              <span className="col-span-2">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background rounded-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background rounded-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Shipping Address</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background rounded-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full h-12 uppercase tracking-widest text-xs rounded-none mt-4"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
