import Page from "@/components/Page";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

type NotFoundProps = {
  //
};

function NotFound(props: NotFoundProps) {
  const router = useRouter();

  return (
    <Page
      isPublic
      breadcrumbs={false}
      footer={false}
      header={false}
      sidebar={false}
      title="404"
    >
      <main className="absolute top-0 right-0 bottom-0 left-0 bg-cover bg-top sm:bg-top flex flex-col justify-center">
        <img
          src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"
          alt="car stuck in between two walls facing away from the camera"
        />
        <div
          className={clsx(
            "z-10",
            "w-full h-full flex flex-col justify-center items-center"
          )}
          style={{
            backdropFilter: "blur(4px)",
          }}
        >
          <p className="text-2xl font-semibold text-white text-opacity-50 sm:text-5xl">
            404
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Uh oh! I think you’re lost.
          </h1>
          <p className="mt-2 text-lg font-medium text-white text-opacity-75">
            It looks like the page you’re looking for doesn't exist.
          </p>
          <div className="mt-6 space-x-4">
            <button
              className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black"
              onClick={() => router.back()}
            >
              Go Back
            </button>
            <Link href="/" replace>
              <button className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black">
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </Page>
  );
}

export default NotFound;
