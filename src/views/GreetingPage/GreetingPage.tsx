import { Greeting } from '@/components/Greeting/Greeting';
import { Header } from '@/components/Header/Header';

export const GreetingPage = () => {
  return (
    <div>
      <Header isGreetingPage={true} />
      <Greeting />
    </div>
  );
};
