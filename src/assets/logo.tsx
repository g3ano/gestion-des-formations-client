import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <svg
      version='1.0'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 670.7 519.1'
      xmlSpace='preserve'
      className={cn('size-20 rounded fill-primary', className)}
      {...props}
    >
      <g id='layer1'>
        <g id='g4719'>
          <g id='g4705'>
            <path
              id='path4707'
              className='st1'
              d='M327,97.7v269.1l-71,0.5V215h-74.4V69l113.3,0.4h2.4C313.3,69.5,326,81.7,327,97.7z'
            />
          </g>
          <g id='g4709'>
            <path
              id='path4711'
              className='st1'
              d='M339.4,97.2v270h71.3V215h75V69H368.6C352.8,68.8,339.7,81.4,339.4,97.2z'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
