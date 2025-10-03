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

const formSchema = z.object({
  crimeType: z.string().min(2, {
    message: "Please select a crime type.",
  }),
  description: z.string().min(15, {
    message: "Please provide a brief description of the crime",
  }),
  date: z.date({ message: "Please select a date" }),
  time: z.string().min(1, { message: "Please select a time" }),
  address: z.string().min(4, {
    message: "address should be a valid one.",
  }),
  city: z.string().min(4, {
    message: "city should be a valid one.",
  }),
  name: z
    .string()
    .min(2, {
      message: "name should have at least 2 characters",
    })
    .optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number should have at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
});

export function ReportForm() {
  const [anonymous, setAnonymous] = React.useState(false);

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
      name: "",
      phone: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast.success("Crime report submitted successfully!", {
      description:
        "Thank you for reporting. Authorities will review your case.",
    });

    form.reset();
  }
  return (
    <div className="">
      <h3 className="text-[32px] leading-10 tracking-[-0.32px] font-semibold text-[#002625]">
        Crime Details
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[480px] p-4 "
        >
          <div className="">
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

            {/*date/time of crime*/}
            <div className="">
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
                          {...field} // <-- connects RHF value + onChange
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/*Desicription of crime*/}
            <div className="grid w-full gap-3 mt-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="message">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="A brief detail of the crime you're reporting."
                        {...field} // <-- this is what connects the input to RHF
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            {/*Reporter info*/}
            <div className="flex items-center space-x-2 mt-6 mb-2.5">
              <input
                id="anonymous"
                type="checkbox"
                checked={anonymous}
                onChange={() => setAnonymous(!anonymous)}
                className="h-4 w-4"
              />
              <Label htmlFor="anonymous">Report Anonymously?</Label>
            </div>
            {!anonymous && (
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
          </div>
          <Button className="text-[14px] px-4 py-2.5" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
