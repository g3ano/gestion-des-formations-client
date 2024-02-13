import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Bird } from 'lucide-react';
import {
  ErrorResponse,
  Link,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  let message = '';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "This page doesn't exist!";
    }

    if (error.status === 401) {
      message = "You aren't authorized to see this";
    }

    if (error.status === 503) {
      message = 'Looks like our API is down';
    }
  }

  return (
    <section className='w-full h-screen flex items-center'>
      <div className='mx-auto max-w-screen-xl'>
        <div className='-z-10 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
          <Icon
            render={Bird}
            className='md:size-[600px] opacity-5'
          />
        </div>
        <div className='mx-auto max-w-screen-sm space-y-4'>
          <div className='flex items-center gap-20'>
            <h1 className='text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600'>
              {error.status}
            </h1>
            <div className='w-96 flex flex-col gap-8'>
              <div className='space-y-4'>
                <p className='text-3xl tracking-tight font-bold md:text-4xl'>
                  <span>{message}</span>
                </p>
                <p className='text-nowrap'>
                  Sorry, It looks like an error has happened. Will fix this soon
                </p>
              </div>
              <Button asChild>
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
