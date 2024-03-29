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
      className={cn('flex h-full w-full items-center', {
        'h-screen': global,
      })}
    >
      <div className='mx-auto max-w-screen-xl'>
        <div className='fixed left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2'>
          <Icon render={Bird} className='opacity-5 md:size-[600px]' />
        </div>
        <div className='mx-auto max-w-screen-sm space-y-4'>
          <div className='flex min-h-40 gap-20'>
            <div
              className={cn('flex flex-col items-center justify-end', {
                'justify-between': !!body.code,
              })}
            >
              <h1 className='text-primary-600 text-7xl font-extrabold tracking-tight lg:text-9xl'>
                {body.status}
              </h1>
              {body.code && <p>{body.code}</p>}
            </div>
            <div className='flex w-96 flex-col justify-between'>
              <div className='flex h-full space-y-4'>
                <p className='my-auto text-pretty text-center'>
                  <span className='text-2xl font-medium'>{body.message}</span>
                </p>
              </div>
              <Button variant='secondary' asChild>
                <Link to='/' replace>
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
