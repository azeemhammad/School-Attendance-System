import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Schools Attendance Dashboard",
  description: "School Attendance Monitoring Dashboard is poised to deliver actionable insights and facilitate effective attendance monitoring in educational institutions.",
};

const RootLayout = ({ children, params }) => {
  return (
    <html lang="en">
      <Head>
        <title>Schools Attendance Dashboard</title>
        <meta
          name="description"
          content="School Attendance Monitoring Dashboard is poised to deliver actionable insights and facilitate effective attendance monitoring in educational institutions."
        />
      </Head>

      <body className={inter.className} >
        {children}
      </body>
    </html>
  );
}

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className} >{children}</body>
//     </html>
//   );
// }

export default RootLayout;