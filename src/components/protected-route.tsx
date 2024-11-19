import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  console.log(user);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
}

// 로그인이 되어있지 않은 경우에는 로그인 페이지로 리다이렉트하는 컴포넌트
// 이 컴포넌트는 firebase.ts 파일에서 export한 auth 객체를 사용하여 현재 로그인한 사용자를 가져옴
// 사용자가 없는 경우에는 로그인 페이지로 리다이렉트
// 이제 이 컴포넌트를 App.tsx 파일에서 사용
// 이제 로그인이 되어있지 않은 경우에는 로그인 페이지로 리다이렉트
