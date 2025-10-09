"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

// ✅ Base schema
const baseSchema = z.object({
  crimeType: z.string().min(2, { message: "Please select a crime type." }),
  description: z
    .string()
    .min(15, { message: "Please provide a brief description of the crime" }),
  date: z.date({ message: "Please select a date" }),
  time: z.string().min(1, { message: "Please select a time" }),
  address: z.string().min(4, { message: "Address should be valid." }),
  city: z.string().min(4, { message: "City should be valid." }),
  anonymous: z.boolean(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

// ✅ Conditional validation
const formSchema = baseSchema.superRefine((data, ctx) => {
  if (!data.anonymous) {
    if (!data.name || data.name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["name"],
        message: "Name should have at least 2 characters",
      });
    }

    if (!data.phone || !/^\d{10,}$/.test(data.phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Phone number must have at least 10 digits",
      });
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Please enter a valid email address",
      });
    }
  }
});

export function ReportForm() {
  const { user } = useAuth();

  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crimeType: "",
      description: "",
      date: undefined,
      time: "",
      address: "",
      city: "",
      anonymous: false,
      name: "",
      phone: "",
      email: "",
    },
  });

  type ReportData = {
    userId: string;
    crimeType: string;
    description: string;
    date: string;
    time: string;
    address: string;
    city: string;
    anonymous: boolean;
    status: string;
    createdAt: unknown;
    updatedAt: unknown;
    reporterName?: string | null;
    reporterPhone?: string | null;
    reporterEmail?: string | null;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("🟡 Submitting report with values:", values);

      if (!user) {
        toast.error("You must be logged in to submit a report.");
        return;
      }

      const reportData: ReportData = {
        userId: user.uid,
        crimeType: values.crimeType,
        description: values.description,
        date: values.date.toISOString().split("T")[0],
        time: values.time,
        address: values.address,
        city: values.city,
        anonymous: values.anonymous,
        status: "Pending Review",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        reporterEmail: user.email || values.email || null, // ✅ keep track of user email
      };

      if (!values.anonymous) {
        reportData.reporterName = values.name || null;
        reportData.reporterPhone = values.phone || null;
        reportData.reporterEmail = values.email || user.email || null;
      }

      console.log("🟢 Sending to Firestore:", reportData);
      await addDoc(collection(db, "crimeReports"), reportData);
      console.log("✅ Firestore write success");

      toast.success("Crime report submitted successfully!", {
        description: "Authorities will review your case soon.",
      });

      form.reset();
    } catch (error) {
      console.error("❌ Firestore write error:", error);
      toast.error("Error submitting report. Please try again.");
    }
  }

  return (
    <div className="">
      <h3 className="text-[32px] leading-10 tracking-[-0.32px] font-semibold text-[#002625]">
        Crime Details
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[480px] p-4"
        >
          <FormField
            control={form.control}
            name="crimeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Crime Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Type of crime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>List of crimes</SelectLabel>
                        <SelectItem value="robbery">Robbery</SelectItem>
                        <SelectItem value="theft">Theft</SelectItem>
                        <SelectItem value="assault">Assault</SelectItem>
                        <SelectItem value="fraud">Fraud</SelectItem>
                        <SelectItem value="kidnapping">Kidnapping</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date & Time */}
          <p className="mt-6 text-sm font-semibold text-muted-foreground">
            (Date & Time of Crime)
          </p>
          <div className="flex flex-col gap-4 mt-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel htmlFor="date-picker">Date</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="justify-between font-normal w-auto"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(val) => {
                          field.onChange(val);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel htmlFor="time-picker">Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      id="time-picker"
                      step="1"
                      {...field}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="A brief detail of the crime you're reporting."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address & City */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Address/Landmark</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  An accurate address of crime zone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>City/Area</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>The city/area of the crime.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Anonymous Checkbox */}
          <FormField
            control={form.control}
            name="anonymous"
            render={({ field }) => (
              <div className="flex items-center space-x-2 mt-6 mb-2.5">
                <input
                  id="anonymous"
                  type="checkbox"
                  checked={field.value}
                  onChange={() => field.onChange(!field.value)}
                  className="h-4 w-4"
                />
                <Label htmlFor="anonymous">Report Anonymously?</Label>
              </div>
            )}
          />

          {/* Reporter Info */}
          {!form.watch("anonymous") && (
            <div className="space-y-3">
              <p className="font-semibold mb-2.5">
                Reporter Information (Optional)
              </p>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button className="text-[14px] px-4 py-2.5" type="submit">
            Submit Report
          </Button>
        </form>
      </Form>
    </div>
  );
}
