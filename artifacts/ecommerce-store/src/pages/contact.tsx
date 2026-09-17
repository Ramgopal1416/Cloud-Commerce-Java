import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Clock3, Mail, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please share your name."),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().min(3, "Add a short subject."),
  message: z.string().trim().min(12, "Tell us a little more so we can help."),
});

type ContactValues = z.infer<typeof contactSchema>;

const defaultValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = (values: ContactValues) => {
    toast({
      title: "Message received",
      description: `Thanks, ${values.name.split(" ")[0]}. Our team will be in touch shortly.`,
    });
    form.reset(defaultValues);
  };

  return (
    <div className="w-full">
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <p className="editorial-kicker text-background/50">Contact</p>
          <h1 className="mt-6 max-w-4xl font-serif text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
            A real person is
            <br />
            <span className="italic text-primary">close by.</span>
          </h1>
          <p className="mt-8 max-w-lg text-base leading-7 text-background/65">
            Product question, order detail, thoughtful suggestion? Send a note.
            We read every one.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:grid-cols-[0.7fr_1.3fr] md:px-8 md:py-24">
        <aside>
          <p className="editorial-kicker text-primary">Find us here</p>
          <div className="mt-8 space-y-7">
            <div className="flex gap-4" data-testid="text-contact-email">
              <Mail className="mt-1 h-4 w-4 text-primary" />
              <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Email</p><a href="mailto:hello@shopai.com" className="mt-1 block text-sm hover:text-primary">hello@shopai.com</a></div>
            </div>
            <div className="flex gap-4" data-testid="text-contact-location">
              <MapPin className="mt-1 h-4 w-4 text-primary" />
              <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Studio</p><p className="mt-1 text-sm">New York · London<br />Working everywhere</p></div>
            </div>
            <div className="flex gap-4" data-testid="text-contact-hours">
              <Clock3 className="mt-1 h-4 w-4 text-primary" />
              <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Hours</p><p className="mt-1 text-sm">Mon–Fri · 9am–6pm ET<br />Usually faster, sometimes human.</p></div>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-6">
            <p className="text-sm leading-6 text-muted-foreground">For order updates, include your order number so we can get straight to the useful part.</p>
          </div>
        </aside>
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-3xl">Send a note</h2>
            <Send className="h-5 w-5 text-primary" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6" data-testid="form-contact">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-[0.14em]">Name</FormLabel>
                    <FormControl><Input {...field} placeholder="Your name" data-testid="input-contact-name" className="h-12 rounded-none border-x-0 border-t-0 bg-transparent px-0 shadow-none focus-visible:ring-0" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-[0.14em]">Email</FormLabel>
                    <FormControl><Input {...field} type="email" placeholder="you@example.com" data-testid="input-contact-email" className="h-12 rounded-none border-x-0 border-t-0 bg-transparent px-0 shadow-none focus-visible:ring-0" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="subject" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-[0.14em]">Subject</FormLabel>
                  <FormControl><Input {...field} placeholder="What can we help with?" data-testid="input-contact-subject" className="h-12 rounded-none border-x-0 border-t-0 bg-transparent px-0 shadow-none focus-visible:ring-0" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-[0.14em]">Message</FormLabel>
                  <FormControl><Textarea {...field} placeholder="The more context, the better." data-testid="textarea-contact-message" className="min-h-36 resize-none rounded-none border-x-0 border-t-0 bg-transparent px-0 shadow-none focus-visible:ring-0" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={form.formState.isSubmitting} className="h-12 rounded-none px-7 uppercase tracking-[0.16em]" data-testid="button-contact-submit">
                {form.formState.isSubmitting ? "Sending..." : "Send message"} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}