import { PropsWithChildren } from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen mx-auto flex flex-col items-center justify-center text-center">
      <Loader2 className="h-10 w-10 animate-spin mb-4 text-foreground" />
      {children}
    </div>
  );
};

export default Loader;
