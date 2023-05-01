import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, database } from "./Firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState();
  let navigate = useNavigate();
  let googleProvider = new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setEmail(res.user.email);
        toast.success("Signed in Successfully!!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="bg-[#393646] text-[#faeee0] h-screen w-screen">
      <h2 className="pt-10 text-6xl text-center mb-20 xl:pt-20">Sign In</h2>
      <button
        className="text-3xl flex items-center justify-center gap-2 bg-[#faeee0] text-[#393646] px-3 py-2 m-3 mx-auto rounded-md"
        onClick={signIn}
      >
        Sign in with Google
        <FcGoogle />
      </button>
    </div>
  );
};

export default Login;
