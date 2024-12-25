import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Loader2, Pencil } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { useChangePasswordMutation } from '@/state/services/user';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const formSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

function ChangePassword() {
  const { toast } = useToast();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await changePassword(values).unwrap();
      toast({
        title: 'Updated successful!',
        description: 'Your password has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={'icon'}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Make changes to your password here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>

                  <FormControl>
                    <Input id="password" type="password" placeholder="password" {...field} aria-label="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePassword;
