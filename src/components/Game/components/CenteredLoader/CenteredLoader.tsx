import { BarLoader } from 'react-spinners';

export const CenteredLoader = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BarLoader color='#6D6D6D' />
    </div>
  );
};
