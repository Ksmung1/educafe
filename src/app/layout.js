import "./globals.css";

export const metadata = {
  title: "Educafe",
  description: "Educafe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
