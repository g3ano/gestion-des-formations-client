import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { AxiosError, isAxiosError } from 'axios';
import { Bird } from 'lucide-react';
import {
  ErrorResponse,
  Link,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';

export default function ErrorPage({
  _error,
  global = false,
}: {
  _error?: AxiosError;
  global?: boolean;
}) {
  const error = (useRouteError() as ErrorResponse) || _error;
  const body = {
    status: 200,
    statusText: '',
    code: '',
    message: '',
  };

  if (isRouteErrorResponse(error)) {
    body.status = error.status;
    if (error.status === 404) {
      body.message = "Cette page n'existe pas!";
    }

    if (error.status === 401) {
      body.message =
        "Oups ! Il semble que vous n'ayez pas l'autorisation nécessaire pour accéder à cette page!";
    }

    if (error.status === 503) {
      body.message = 'Il semble que notre API soit hors service';
    }
  }
  if (
    error &&
    isAxiosError<{
      errors: Record<string, unknown>;
    }>(error)
  ) {
    body.status = error.response!.status;
    body.statusText = error.response!.statusText;
    body.code = error.code!;
    body.message = error.response?.data.errors.message as string;
  }

  if (!body.message) {
    body.message = 'Oops, an error just happened';
  }

  return (
    <section
      className={cn('w-full h-full flex items-center', {
        'h-screen': global,
      })}
    >
      <div className='mx-auto max-w-screen-xl'>
        <div className='-z-10 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
          <Icon
            render={Bird}
            className='md:size-[600px] opacity-5'
          />
        </div>
        <div className='mx-auto max-w-screen-sm space-y-4'>
          <div className='flex gap-20 min-h-40'>
            <div
              className={cn('flex flex-col items-center justify-end', {
                'justify-between': !!body.code,
              })}
            >
              <h1 className='text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600'>
                {body.status}
              </h1>
              {body.code && <p>{body.code}</p>}
            </div>
            <div className='w-96 flex flex-col justify-between'>
              <div className='space-y-4 flex h-full'>
                <p className='text-pretty text-center my-auto'>
                  <span className='text-2xl font-medium'>{body.message}</span>
                </p>
              </div>
              <Button
                variant='secondary'
                asChild
              >
                <Link
                  to='/'
                  replace
                >
                  Page d&apos;accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
