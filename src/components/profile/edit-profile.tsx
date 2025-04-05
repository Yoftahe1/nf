import * as z from 'zod';
import { useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarIcon, Loader2, Pencil } from 'lucide-react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RootState } from '@/state/store';
import { Calendar } from '../ui/calendar';
import { setUser } from '@/state/slice/auth';
import { useToast } from '@/hooks/use-toast';
import { PhoneInput } from '../ui/phone-input';
import LocationSelector from '../ui/location-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfileMutation } from '@/state/services/user';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

const formSchema = z.object({
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .refine((value) => isValidPhoneNumber(value), {
      message: 'Invalid phone number',
    }),
  first_name: z.string().min(2, 'First name must be at least 2 characters long'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters long'),
  profile_pic: z.any().optional(),
  date_of_birth: z.coerce.date().optional(),
  address: z.string().optional(),
});

const EditProfile = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [_, setCountryName] = useState<string>('');
  const user = useSelector((state: RootState) => state.auth.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user?.first_name ? user?.first_name : '',
      last_name: user?.last_name ? user?.last_name : '',
      date_of_birth: user?.date_of_birth ? new Date(user?.date_of_birth) : undefined,
      phone_number: user?.phone_number ? user?.phone_number : '',
      address: user?.address ? user?.address : '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('phone_number', values.phone_number);
    if (values.date_of_birth) formData.append('date_of_birth', values.date_of_birth.toISOString());
    if (values.address) formData.append('address', values.address);
    if (values.profile_pic) formData.append('profile_pic', values.profile_pic);
    try {
      const profile = await updateProfile({ data: formData }).unwrap();

      const userDate = {
        created_at: profile[0].created_at,
        email: user!.email,
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        date_of_birth: profile[0].date_of_birth,
        profile_pic: profile[0].profile_pic,
        address: profile[0].address,
        xp: user!.xp,
        current_streak: user!.current_streak,
        highest_streak: user!.highest_streak,
        last_answered: user!.last_answered,
      };
      dispatch(setUser({user:userDate}));
      toast({
        title: 'Update successful!',
        description: 'Your profile has been created successfully.',
      });
    } catch (error) {
      console.error('Form submission error', error);
      toast({
        title: 'Update failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={'icon'}>
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="first_name">first_name</FormLabel>
                  <FormControl>
                    <Input id="first_name" type="text" placeholder="first_name" autoComplete="off" {...field} aria-label="first_name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="last_name">last_name</FormLabel>
                  <FormControl>
                    <Input id="last_name" type="text" placeholder="last_name" autoComplete="off" {...field} aria-label="last_name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" toDate={new Date()} selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput placeholder="phone number" {...field} defaultCountry="ET" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <LocationSelector
                        value={field.value ?? ''}
                        onCountryChange={(country) => {
                          setCountryName(country?.name || '');
                          form.setValue(field.name, country?.name || '');
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="profile_pic"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <Input {...fieldProps} type="file" accept="image/*" onChange={(event) => onChange(event.target.files && event.target.files[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-1" />
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
              Save changes
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfile;
