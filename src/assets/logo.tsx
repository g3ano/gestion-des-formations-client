import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <svg
      viewBox='153.6 165.1 334.4 334.4'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('size-8', className)}
      {...props}
    >
      <path
        className='st0'
        d='M231.8,246.5L231.8,246.5c0-3.1,2.5-5.6,5.6-5.6H488v-75.8H169.4c-8.7,0-15.8,7.1-15.8,15.8v129.6 c0,8.7,7.1,15.8,15.8,15.8h236.2c3.1,0,5.6,2.5,5.6,5.6s-2.5,5.6-5.6,5.6h-252v75.3h133.2v10.9H153.7v75.8H488v-75.8H354.8v-10.9 h117.4c8.7,0,15.8-7.1,15.8-15.8V267.9c0-8.7-7.1-15.8-15.8-15.8H237.3C234.3,252.1,231.8,249.6,231.8,246.5'
        transform='matrix(1, 0, 0, 1, 0, 7.105427357601002e-15)'
      />
    </svg>
  );
};

export default Logo;
