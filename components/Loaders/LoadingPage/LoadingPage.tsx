import Spinner from "../Spinner";

type LoadingPageProps = {
  //
};

function LoadingPage(props: LoadingPageProps) {
  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <span className="animate-ping h-6 w-6 rounded-full bg-primary" />
    </div>
  );
}

export default LoadingPage;
