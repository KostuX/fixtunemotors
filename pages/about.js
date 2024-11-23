import DefaultLayout from "../layouts/default";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="justify-between h-full text-center ">
        <div className="border  m-5  border-theme_secondary">About Page</div>
        <span className="grid grid-cols-2 gap-4  m-3 h-56 ">
          <span className="border  border-theme_secondary">Left Panel</span>
          <span className="border  border-theme_secondary">Right Panel</span>
        </span>
      </div>
    </DefaultLayout>
  );
}
