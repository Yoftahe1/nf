import { useDispatch } from 'react-redux';
import { Loader2, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';
import { signOut } from '@/state/slice/user';
import { useToast } from '@/hooks/use-toast';
import { useDeleteUserMutation } from '@/state/services/user';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function DeleteAccount() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  async function onClick() {
    try {
      await deleteUser({}).unwrap();
      dispatch(signOut());
      navigate('/auth/login');
      toast({
        title: 'Delete successful!',
        description: 'Your account has been deleted successfully.',
      });
    } catch (error) {
      console.log(error)
      toast({
        title: 'Deletion failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={'icon'} className="border-destructive text-destructive hover:bg-destructive/90 hover:text-white">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>Are you sure you want to permanently delete your account.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} variant={'destructive'} onClick={onClick}>
            {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccount;
