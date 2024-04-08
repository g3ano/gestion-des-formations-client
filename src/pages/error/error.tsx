import { cn } from '@/lib/utils';
import { AxiosError, isAxiosError } from 'axios';
import {
  ErrorResponse,
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
    body.message = error.response?.data.errors.message as string;
  }

  if (!body.message) {
    body.message = 'Oops, an error just happened';
  }

  return (
    <section
      className={cn('flex h-full w-full items-center justify-center', {
        'h-screen': global,
      })}
    >
      <div className='flex h-40 items-center gap-20'>
        <h1 className='text-primary-600 text-7xl font-extrabold tracking-tight lg:text-9xl'>
          {body.status}
        </h1>
        <div className='h-1/2 w-px bg-border'></div>
        <div className='flex w-96 items-center'>
          <p className='text-pretty text-center text-2xl'>{body.message}</p>
        </div>
      </div>
    </section>
  );
}
