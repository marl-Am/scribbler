import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";

const CreateUserWizard = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <img
        src={user.profileImageUrl}
        alt="Profile image"
        className="ml-1 mr-1 h-12 w-12 rounded-full"
      />
      <input placeholder="Type some text" className="bg-transparent"></input>
    </div>
  );
};

export default CreateUserWizard;
