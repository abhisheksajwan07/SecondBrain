import SideNav from "./SideNav";

const Home = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      <SideNav />
      <div className="w-[80%] h-full overflow-x-hidden overflow-auto"></div>
    </div>
  );
};

export default Home;
