import { Navbar } from "./components/navbar";
import { View } from "./components/view";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <video
        src="bg3.mp4"
        autoPlay={true}
        muted
        loop={true}
        className="fixed min-w-full min-h-full z-1"
      ></video>
      <Navbar />
      {/* <View /> */}
      {children}
    </main>
  );
}
