import Page from '@/components/layout/page';
import { queryClient } from '@/lib/router';
import { ActionFormData, createAction } from '@/pages/action';
import { useMutation } from '@tanstack/react-query';

function ActionCreate() {
  const mutation = useMutation({
    mutationFn: (action: ActionFormData) => createAction(action),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['actions'],
      });
    },
  });

  return (
    <Page title='Nouveau Action'>
      <div>
        <div>Create</div>
      </div>
    </Page>
  );
}
export default ActionCreate;
