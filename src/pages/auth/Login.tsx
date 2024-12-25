import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { setCredentials } from '@/state/slice/auth';
import { useLoginUserMutation } from '@/state/services/user';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default function Login() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await loginUser(values).unwrap();
      const user = response.user;
      const token = response.accessToken;
      dispatch(setCredentials({ user, token }));
      navigate('/app/learn');
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Login failed',
        description:
          error.data?.code === 'invalid_credentials' ? "Email address and password don't match." : 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login for your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="m@example.com" {...field} aria-label="Email Address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel htmlFor="password">Password</FormLabel>

                      <Link to={'/auth/forgotpassword'} className="text-xs underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input id="password" type="password" placeholder="password" {...field} aria-label="Password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <span>Already have an account? </span>
            <Link to={'/auth/signup'} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
