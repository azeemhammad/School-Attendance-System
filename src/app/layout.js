
import { Inter } from "next/font/google";
import "./globals.css";
import ProcessingLoader from "./components/processing-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Attendance System",
  description: "World Bank School Attendance System",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className} >{children}</body>
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

export default RootLayout