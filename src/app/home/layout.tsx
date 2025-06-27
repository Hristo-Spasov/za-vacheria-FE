import HomeHeader from "@/components/HomeHeader";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeHeader/>
      <main className='container mx-auto py-4'>{children}</main>
      <footer>
      </footer>
    </>
  );
};

export default HomeLayout;
